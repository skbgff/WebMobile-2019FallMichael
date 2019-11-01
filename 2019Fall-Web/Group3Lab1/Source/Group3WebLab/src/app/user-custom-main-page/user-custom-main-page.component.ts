import { Component, OnInit } from '@angular/core';
import {AuthenticationService, studentInfo} from '../authentication.service';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-custom-main-page',
  templateUrl: './user-custom-main-page.component.html',
  styleUrls: ['./user-custom-main-page.component.css']
})
export class UserCustomMainPageComponent implements OnInit {
  information: studentInfo = {
    studentID: '',
    studentAddress: '',
    studentEmail: '',
    exp: 0,
    iat: 0,
    studentName: '',
    studentPhone: ''
  };

  constructor( private api: ApiService, private router: Router, private auth: AuthenticationService ) { }

  ngOnInit() {
    this.auth.account().subscribe(student => {
      this.information = student;
    });
  }

  updateInfo(studentID, info) {
    this.api.updateUserMain(studentID, info)
      .subscribe(resp => {
      });
  }

}
