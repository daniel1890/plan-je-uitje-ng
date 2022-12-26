import { Route } from "src/app/models/route";

export class PlanRouteResponse {
    public route: Route;

    constructor(response: any) {
        this.route = response;
    }
}