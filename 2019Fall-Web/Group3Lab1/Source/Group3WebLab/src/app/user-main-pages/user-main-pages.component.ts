import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-main-pages',
  templateUrl: './user-main-pages.component.html',
  styleUrls: ['./user-main-pages.component.css']
})
export class UserMainPagesComponent implements OnInit {

  students: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserMain()
      .subscribe(resp => {
        this.students = resp;
      });
  }

}
