import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniPasswordChangeComponent } from './alumni-password-change.component';

describe('AlumniPasswordChangeComponent', () => {
  let component: AlumniPasswordChangeComponent;
  let fixture: ComponentFixture<AlumniPasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniPasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
