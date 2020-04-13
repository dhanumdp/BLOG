import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyChangePasswordComponent } from './faculty-change-password.component';

describe('FacultyChangePasswordComponent', () => {
  let component: FacultyChangePasswordComponent;
  let fixture: ComponentFixture<FacultyChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
