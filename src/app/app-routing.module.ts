import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanTripPageComponent } from './components/plan-trip-page/plan-trip-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/plan-trip', pathMatch: 'full'},
  { path: 'plan-trip', component: PlanTripPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
