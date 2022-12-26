export interface Route {
    type: string,
    properties: {
        mode: string,
        waypoints: Array<any>,
        units: string,
        distance: number,
        distance_units: string,
        time: number,
        legs: Array<any>,
    }
    geometry: {
        type: string,
        coordinates: string,
    }
}
