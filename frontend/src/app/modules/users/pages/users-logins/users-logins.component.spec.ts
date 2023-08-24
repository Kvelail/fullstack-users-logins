import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoginsComponent } from './users-logins.component';

describe('UsersLoginsComponent', () => {
  let component: UsersLoginsComponent;
  let fixture: ComponentFixture<UsersLoginsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersLoginsComponent]
    });
    fixture = TestBed.createComponent(UsersLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
