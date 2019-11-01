import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserCourseComponent } from './create-user-course.component';

describe('CreateUserCourseComponent', () => {
  let component: CreateUserCourseComponent;
  let fixture: ComponentFixture<CreateUserCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
