import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeOverviewComponent } from './fee-overview.component';

describe('FeeOverviewComponent', () => {
  let component: FeeOverviewComponent;
  let fixture: ComponentFixture<FeeOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeOverviewComponent]
    });
    fixture = TestBed.createComponent(FeeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
