import { Place } from "src/app/models/place";

export class PlanRouteRequest {
    public places: Place[];

    constructor(places: Place[]) {
        this.places = places;
    }
  }