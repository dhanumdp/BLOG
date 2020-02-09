import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniprofileComponent } from './alumniprofile.component';

describe('AlumniprofileComponent', () => {
  let component: AlumniprofileComponent;
  let fixture: ComponentFixture<AlumniprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
