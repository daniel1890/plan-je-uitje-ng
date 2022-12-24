import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subject } from 'rxjs';
import { Coordinates } from 'src/app/models/coordinates';
import { Place } from 'src/app/models/place';
import { handleError } from '../helper-functions';
import { ROUTE_URL } from '../urls';
import { GetPlacesResponse } from './dto/get-places-response.dto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private apiKey = environment.apiKey;
  private static MAXIMUM_AMOUNT_OF_PLACES: number = 10;
  private userLatitude! :number;
  private userLongitude! :number;
  private coordinatesReceived = new Subject<Coordinates>();
  public coordinatesReceived$ = this.coordinatesReceived.asObservable();

  private places!: Place[];
  private placesReceived = new Subject<Place[]>();
  public placesReceived$ = this.placesReceived.asObservable();

  private userPlaces: Place[] = [];
  private userPlaceReceived = new Subject<Place>();
  public userPlaceReceived$ = this.userPlaceReceived.asObservable();

  private selectedPopupPlace = new Subject<Place>();
  public selectedPopupPlace$ = this.selectedPopupPlace.asObservable();

  private static readonly JSON_HEADERS: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(succes => {
      this.setUserLongitude(succes.coords.longitude);
      this.setUserLatitude(succes.coords.latitude);
      this.coordinatesReceived.next({longitude: succes.coords.longitude, latitude: succes.coords.longitude});
    });
  }

  sendSelectedPlace(selectedPlace: Place) {
    this.selectedPopupPlace.next(selectedPlace);
  }

  setUserLatitude(userLatitude:number) {
    this.userLatitude = userLatitude;
  }

  setUserLongitude(userLongitude: number) {
    this.userLongitude = userLongitude;
  }

  getPlaces(): Observable<GetPlacesResponse> {
    const headers = PlaceService.JSON_HEADERS;

    return this.http.get<GetPlacesResponse>(`https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${this.userLongitude},${this.userLatitude},5000&limit=20&apiKey=${this.apiKey}`
    ,{headers})
    .pipe(
      catchError(handleError<GetPlacesResponse>('getPlaces'))
    );
  }

  getUserPlaces(): Observable<Place[]> {
    const userPlaces = of(this.userPlaces);

    return userPlaces
    .pipe(
      catchError(handleError<Place[]>('getUserPlaces', []))
    );
  }

  resetUserPlaces(): void {
    this.userPlaces = [];
  }

  addPlaceToUserPlaces(placeToAdd: Place): void {
    if(!this.userPlaces.includes(placeToAdd)) {

      if (this.userPlaces.length < PlaceService.MAXIMUM_AMOUNT_OF_PLACES) {
        this.userPlaces.push(placeToAdd);
        console.log(this.userPlaces);
      }
    }
  }

}
