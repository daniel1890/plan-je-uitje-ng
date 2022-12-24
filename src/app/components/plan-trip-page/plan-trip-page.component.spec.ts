import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTripPageComponent } from './plan-trip-page.component';

describe('PlanTripPageComponent', () => {
  let component: PlanTripPageComponent;
  let fixture: ComponentFixture<PlanTripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTripPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
