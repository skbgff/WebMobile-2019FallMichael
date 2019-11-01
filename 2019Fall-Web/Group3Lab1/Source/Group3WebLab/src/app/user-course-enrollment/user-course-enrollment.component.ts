import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-user-course-enrollment',
  templateUrl: './user-course-enrollment.component.html',
  styleUrls: ['./user-course-enrollment.component.css']
})
export class UserCourseEnrollmentComponent implements OnInit {

  accountNum: string;
  accountCourses: any;
  notEnrolledCourses: any;

  emptyCourse = {
    name: '',
    time: '',
    desc: '',
    dept: '',
    instructors: '',
  };

  constructor( private api: ApiService, private router: Router, private auth: AuthenticationService ) { }

  ngOnInit() {
    this.updateCourses(this.auth.getStudentID());
  }

  updateCourses(ids: string) {
    this.auth.account().subscribe(student => {
      this.accountNum = student.studentID;
      this.getCourses(student.courses);
      this.getOtherClasses(student.courses);
    });
  }

  enrollCourse(courseID: string) {
    this.api.enrollCourse(this.accountNum, courseID).subscribe(resp => {
      this.updateCourses( this.accountNum );
    });
  }

  dropCourse(courseID: string) {
    this.api.dropCourse(this.accountNum, courseID).subscribe(resp => {
      this.updateCourses( this.accountNum );
    });
  }

  getCourses(id: string[]) {
    if ( id.length > 0) {
      this.api.getMoreCourses(id).subscribe(course => {
        this.accountCourses = course;
      });
    } else {
      this.accountCourses = this.emptyCourse;
    }
  }

  getOtherClasses(id: string[]) {
    this.api.getOtherCourses(id).subscribe(course => {
      this.notEnrolledCourses = course;
    });
  }

}
