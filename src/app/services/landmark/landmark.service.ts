import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subject } from 'rxjs';
import { Landmark } from 'src/app/models/landmark';
import { handleError } from '../helper-functions';
import { ROUTE_URL } from '../urls';
import { GetLandmarksResponse } from './dto/get-landmarks-response.dto';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private userLandmarks: Landmark[] = [];
  private userLandmarkReceived = new Subject<Landmark>();
  public userlandmarkReceived$ = this.userLandmarkReceived.asObservable();

  private maximumAmountOfLandmarks = 10;

  private static readonly JSON_HEADERS: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  getLandmarks(): Observable<GetLandmarksResponse> {
    const headers = LandmarkService.JSON_HEADERS;

     return this.http.get<GetLandmarksResponse>(ROUTE_URL, {headers})
     .pipe(
      catchError(handleError<GetLandmarksResponse>('getLandsmarks'))
    );
  }

  getUserLandmarks(): Observable<Landmark[]> {
    const userLandmarks = of(this.userLandmarks);

    return userLandmarks
    .pipe(
      catchError(handleError<Landmark[]>('getUserLandsmarks', []))
    );
  }

  addLandmarkToUserLandmarks(landmark : Landmark): boolean {
    if(!this.userLandmarks.includes(landmark)) {

      if (this.userLandmarks.length < this.maximumAmountOfLandmarks) {
        this.userLandmarks.push(landmark);
        return true;
      }
    }
    return false;
  }

  resetUserLandmarks(): void {
    this.userLandmarks = [];
  }

  removeLandmarkFromUserLandmarks(landmark : Landmark): void {
    this.userLandmarks.splice(this.userLandmarks.indexOf(landmark) , 1);
  }
}
