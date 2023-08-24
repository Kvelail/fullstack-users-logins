import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsListComponent } from './logins-list.component';

describe('LoginsListComponent', () => {
  let component: LoginsListComponent;
  let fixture: ComponentFixture<LoginsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginsListComponent]
    });
    fixture = TestBed.createComponent(LoginsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
