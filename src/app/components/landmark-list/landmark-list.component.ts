import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place';
import { PlaceService } from '../../services/place/place.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-landmark-list',
  templateUrl: './landmark-list.component.html',
  styleUrls: ['./landmark-list.component.scss']
})
export class LandmarkListComponent implements OnInit {
  userPlaces: Place[] = [];

  constructor(private placeService: PlaceService, private routeService: RouteService) { }

  ngOnInit(): void {
    this.placeService.resetUserPlaces();
    this.getUserPlaces();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.userPlaces, event.previousIndex, event.currentIndex);
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

  planRoute(): void {
    this.routeService.planRoute(this.userPlaces);
  }

}
