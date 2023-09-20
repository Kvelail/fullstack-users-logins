import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoadingSpinnerComponent } from './users-loading-spinner.component';

describe('UsersLoadingSpinnerComponent', () => {
  let component: UsersLoadingSpinnerComponent;
  let fixture: ComponentFixture<UsersLoadingSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersLoadingSpinnerComponent]
    });
    fixture = TestBed.createComponent(UsersLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
