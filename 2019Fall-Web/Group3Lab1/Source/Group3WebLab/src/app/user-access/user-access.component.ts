import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {

  credentials: { studentPassword: string; studentEmail: string } = {
    studentEmail: '',
    studentPassword: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.signIn(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    });
  }

  ngOnInit(): void {
  }
}
