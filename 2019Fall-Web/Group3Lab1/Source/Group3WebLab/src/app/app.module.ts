import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserCourseComponent } from './create-user-course/create-user-course.component';
import { EditUserCourseComponent } from './edit-user-course/edit-user-course.component';
import { UserCourseListsComponent } from './user-course-lists/user-course-lists.component';
import { UserCourseEnrollmentComponent } from './user-course-enrollment/user-course-enrollment.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { UserMainPageComponent } from './user-main-page/user-main-page.component';
import { UserCustomMainPageComponent } from './user-custom-main-page/user-custom-main-page.component';
import { UserMainPagesComponent } from './user-main-pages/user-main-pages.component';
import { CreateUserMainComponent } from './create-user-main/create-user-main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FriendsPageComponent } from './friends-page/friends-page.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'user-access', component: UserAccessComponent },
  { path: 'create-user-main', component: CreateUserMainComponent },
  { path: 'user-course-enrollment', component: UserCourseEnrollmentComponent },
  { path: 'user-custom-main-page', component: UserCustomMainPageComponent },
  { path: 'user-main-page', component: UserMainPageComponent, canActivate: [AuthGuardService] },
  { path: 'user-main-pages', component: UserMainPagesComponent},
  { path: 'create-user-course', component: CreateUserCourseComponent },
  { path: 'edit-user-course/:id', component: EditUserCourseComponent },
  { path: 'user-course-lists', component: UserCourseListsComponent }
  ];


@NgModule({
  declarations: [
    AppComponent,
    CreateUserCourseComponent,
    EditUserCourseComponent,
    UserCourseListsComponent,
    UserCourseEnrollmentComponent,
    UserAccessComponent,
    UserMainPageComponent,
    UserCustomMainPageComponent,
    UserMainPagesComponent,
    CreateUserMainComponent,
    HomePageComponent,
    FriendsPageComponent,
    TeachersPageComponent,
    CalendarPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
