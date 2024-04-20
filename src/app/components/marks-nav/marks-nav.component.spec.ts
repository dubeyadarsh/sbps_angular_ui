import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksNavComponent } from './marks-nav.component';

describe('MarksNavComponent', () => {
  let component: MarksNavComponent;
  let fixture: ComponentFixture<MarksNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarksNavComponent]
    });
    fixture = TestBed.createComponent(MarksNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
