import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place/place.service';

@Component({
  selector: 'app-plan-trip-page',
  templateUrl: './plan-trip-page.component.html',
  styleUrls: ['./plan-trip-page.component.scss']
})
export class PlanTripPageComponent implements OnInit {

  constructor(private PlaceService: PlaceService) { }

  ngOnInit(): void {

  }

}
