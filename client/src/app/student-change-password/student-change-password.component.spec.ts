import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChangePasswordComponent } from './student-change-password.component';

describe('StudentChangePasswordComponent', () => {
  let component: StudentChangePasswordComponent;
  let fixture: ComponentFixture<StudentChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
