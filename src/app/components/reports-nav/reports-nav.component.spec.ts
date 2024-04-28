import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsNavComponent } from './reports-nav.component';

describe('ReportsNavComponent', () => {
  let component: ReportsNavComponent;
  let fixture: ComponentFixture<ReportsNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsNavComponent]
    });
    fixture = TestBed.createComponent(ReportsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
