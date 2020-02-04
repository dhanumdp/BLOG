import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniloginComponent } from './alumnilogin.component';

describe('AlumniloginComponent', () => {
  let component: AlumniloginComponent;
  let fixture: ComponentFixture<AlumniloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
