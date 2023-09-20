import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAuthBtnComponent } from './users-auth-btn.component';

describe('UsersAuthBtnComponent', () => {
  let component: UsersAuthBtnComponent;
  let fixture: ComponentFixture<UsersAuthBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAuthBtnComponent]
    });
    fixture = TestBed.createComponent(UsersAuthBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
