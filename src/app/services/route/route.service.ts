import { Route } from './../../models/route';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Place } from 'src/app/models/place';
import { PlanRouteResponse } from './dto/plan-route-response.dto';
import { PlanRouteRequest } from './dto/plan-route-request.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiKey = environment.apiKey;

  private routeReceived = new Subject<Route>();
  public routeReceived$ = this.routeReceived.asObservable();

  private static readonly JSON_HEADERS: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  planRoute(places: Place[]): void {
    const headers = RouteService.JSON_HEADERS;
    const planRouteRequest = new PlanRouteRequest(places);

    this.http.get<PlanRouteResponse>(`https://api.geoapify.com/v1/routing?waypoints=51.9866271,5.9027517|51.998429,5.973999&mode=drive&apiKey=${this.apiKey}`, {headers}).subscribe({
      next: (data) => {
        this.onPlanRoute(data);
      },
    });
  }


  private onPlanRoute(planRouteResponse: PlanRouteResponse): void {
    console.log('We have received a route! ', planRouteResponse);
    this.routeReceived.next(planRouteResponse.route);
  }
}
