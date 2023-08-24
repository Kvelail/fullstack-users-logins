import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSubmitBtnComponent } from './users-submit-btn.component';

describe('UsersSubmitBtnComponent', () => {
  let component: UsersSubmitBtnComponent;
  let fixture: ComponentFixture<UsersSubmitBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSubmitBtnComponent]
    });
    fixture = TestBed.createComponent(UsersSubmitBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
