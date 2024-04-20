import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeItemComponent } from './fee-item.component';

describe('FeeItemComponent', () => {
  let component: FeeItemComponent;
  let fixture: ComponentFixture<FeeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeItemComponent]
    });
    fixture = TestBed.createComponent(FeeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
