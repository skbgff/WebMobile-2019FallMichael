import { Component, OnInit } from '@angular/core';
import {AuthenticationService, studentInfo} from '../authentication.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css']
})
export class UserMainPageComponent implements OnInit {

  information: studentInfo;
  MainCourses: any;


  constructor(private auth: AuthenticationService, private api: ApiService) {
  }

  ngOnInit() {
    this.auth.account().subscribe(student => {
      this.information = student;
      this.getCourses(student.classes);
    });
  }

  getCourses(ID: string[]) {
    this.api.getMoreCourses(ID).subscribe(course => {
      this.MainCourses = course;
    });
  }

}
