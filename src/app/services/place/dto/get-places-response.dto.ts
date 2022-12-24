import { Place } from './../../../models/place';

export class GetPlacesResponse {
    public features: Place[];

    constructor(places: Place[]) {
        this.features = places;
    }
}