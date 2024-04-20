import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfYearlyMarksheetComponent } from './half-yearly-marksheet.component';

describe('HalfYearlyMarksheetComponent', () => {
  let component: HalfYearlyMarksheetComponent;
  let fixture: ComponentFixture<HalfYearlyMarksheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HalfYearlyMarksheetComponent]
    });
    fixture = TestBed.createComponent(HalfYearlyMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
