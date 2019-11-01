import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseEnrollmentComponent } from './user-course-enrollment.component';

describe('UserCourseEnrollmentComponent', () => {
  let component: UserCourseEnrollmentComponent;
  let fixture: ComponentFixture<UserCourseEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
