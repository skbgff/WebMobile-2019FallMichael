import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-course-lists',
  templateUrl: './user-course-lists.component.html',
  styleUrls: ['./user-course-lists.component.css']
})
export class UserCourseListsComponent implements OnInit {

  courses: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUserCourses()
      .subscribe(resp => {
        this.courses = resp;
      });
  }
}
