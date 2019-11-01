import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user-main',
  templateUrl: './create-user-main.component.html',
  styleUrls: ['./create-user-main.component.css']
})
export class CreateUserMainComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) {}
  credentials: { studentPassword: string; studentEmail: string } = {
    studentEmail: '',
    studentPassword: ''
  };

  ngOnInit() {
  }
  signUp() {
    this.auth.signUp(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/user-main-page');
    });
  }

}
