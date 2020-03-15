import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyprofileComponent } from './facultyprofile.component';

describe('FacultyprofileComponent', () => {
  let component: FacultyprofileComponent;
  let fixture: ComponentFixture<FacultyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
