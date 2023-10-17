import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerRightButtonsComponent } from './lower-right-buttons.component';

describe('LowerRightButtonsComponent', () => {
  let component: LowerRightButtonsComponent;
  let fixture: ComponentFixture<LowerRightButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LowerRightButtonsComponent]
    });
    fixture = TestBed.createComponent(LowerRightButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
