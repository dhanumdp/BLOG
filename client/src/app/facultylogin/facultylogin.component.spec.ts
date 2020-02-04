import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyloginComponent } from './facultylogin.component';

describe('FacultyloginComponent', () => {
  let component: FacultyloginComponent;
  let fixture: ComponentFixture<FacultyloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
