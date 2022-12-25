import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place';
import { PlaceService } from '../../services/place/place.service';

@Component({
  selector: 'app-landmark-list',
  templateUrl: './landmark-list.component.html',
  styleUrls: ['./landmark-list.component.scss']
})
export class LandmarkListComponent implements OnInit {
  userPlaces: Place[] = [];

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.resetUserPlaces();
    this.getUserPlaces();
  }
  
  getUserPlaces(): void {
    this.placeService.getUserPlaces()
        .subscribe(userPlaces => this.userPlaces = userPlaces);
  }

  sendSelectedPlace(selectedPlace: Place) {
    this.placeService.sendSelectedPlace(selectedPlace);
  }

  removePlaceFromUserList(placetoRemove: Place): void {
    let placeToRemoveId = this.userPlaces.indexOf(placetoRemove);
    this.userPlaces.splice(placeToRemoveId, 1);
  }

}
