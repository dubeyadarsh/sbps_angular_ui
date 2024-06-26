import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportsComponent } from './attendance-reports.component';

describe('AttendanceReportsComponent', () => {
  let component: AttendanceReportsComponent;
  let fixture: ComponentFixture<AttendanceReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceReportsComponent]
    });
    fixture = TestBed.createComponent(AttendanceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
