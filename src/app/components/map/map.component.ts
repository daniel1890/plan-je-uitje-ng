import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet'; 
import { LatLng } from 'leaflet';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Place } from 'src/app/models/place';
import { PlaceService } from '../../services/place/place.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Leaflet.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  layers: any = [];

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    overlays: {
      'Places': Leaflet.layerGroup(this.layers)
    },
    zoom: 16,
  }

  places!: Place[];
  private placesReceived = new Subject<Place[]>();
  public placesReceived$ = this.placesReceived.asObservable();


  constructor(private placeService: PlaceService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.placeService.getUserCoordinates();

    this.placeService.coordinatesReceived$.subscribe({
      next: () => {
        this.placeService.getPlaces().subscribe({
          next: (places) =>{
            this.places = places.features;
            this.placesReceived.next(this.places);
          }
        });
      }
    });

    this.placesReceived$.subscribe({
      next: (places) => {
        console.log(places)
        this.initializeMarkers(places)
      }
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.map.locate({setView: true, maxZoom: 16});
  }

  initializeMarkers(places: Place[]) {
    places.forEach((place, index) => {
      const marker = this.generateMarker(place, index);
      marker.addTo(this.map);
      this.layers.push(marker);
    });

  }

  addMarkerToUserPlaces(index: number): void {
    console.log(index);
    console.log(this.places[index]);
    this.placeService.addPlaceToUserPlaces(this.places[index]);
    this.map.closePopup();
    this.map.fireEvent('click',{latlng:[0,0]})
  }

  generateMarker(place: Place, index: number) {
    return Leaflet.marker([place.geometry.coordinates[1], place.geometry.coordinates[0]])
    .bindPopup(place.properties.name)
    .setPopupContent(
      `
      <div>
        <h1 class="font-bold text-2xl">${place.properties.name}</h1>
        <p class="text-base"><b>Plaats:</b> ${place.properties.city}</p>
        <div><p class="text-base"><b>Adres:</b> ${place.properties.address_line1}, <b>Postcode:</b> ${place.properties.postcode}</p></div>
        <div class="flex flex-row justify-end"><button (click)="addMarkerToUserPlaces(${place}) type="button" class="btn btn-primary">Voeg toe aan route</button></div>
      </div>
      `
    )
    .on("popupopen", () => {
      this.elementRef.nativeElement
        .querySelector(".btn")
        .addEventListener("click", () => {
          this.addMarkerToUserPlaces(index);
        });
    })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
    console.log(this.places[index])
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 

}
