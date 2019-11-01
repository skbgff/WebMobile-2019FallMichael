import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-create-user-course',
  templateUrl: './create-user-course.component.html',
  styleUrls: ['./create-user-course.component.css']
})
export class CreateUserCourseComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  newCourse = {
    name: '',
    time: '',
    desc: '',
    dept: '',
    instructors: '',
  };

  ngOnInit() { }

  refreshCourse() {
    this.newCourse = {
      name: '',
      time: '',
      desc: '',
      dept: '',
      instructors: '',
    };
  }

  courseConfirm() {
    this.api.postCourse(this.newCourse)
      .subscribe(resp => {
        const studentID = resp.studentID;
        this.refreshCourse();
        this.router.navigate(['/create-user-course', studentID]);
      });
  }
}
