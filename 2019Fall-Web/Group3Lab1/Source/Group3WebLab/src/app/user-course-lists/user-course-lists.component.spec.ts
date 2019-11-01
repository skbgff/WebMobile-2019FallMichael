import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseListsComponent } from './user-course-lists.component';

describe('UserCourseListsComponent', () => {
  let component: UserCourseListsComponent;
  let fixture: ComponentFixture<UserCourseListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
