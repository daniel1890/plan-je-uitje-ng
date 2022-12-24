import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanTripPageComponent } from './components/plan-trip-page/plan-trip-page.component';
import { MapComponent } from './components/map/map.component';
import { LandmarkListComponent } from './components/landmark-list/landmark-list.component';

import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    AppComponent,
    PlanTripPageComponent,
    MapComponent,
    LandmarkListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
