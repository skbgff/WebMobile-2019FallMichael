import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }
  updateUserMain(studentID: string, info): Observable<any> {
    const url = `${apiUrl}/users/${studentID}`;
    return this.http.put(url, info, httpOptions);
  }

  getUserMain(): Observable<any> {
    const url = `${apiUrl}/users/`;
    return this.http.get(url, httpOptions);
  }
  getUserCourses(): Observable<any> {
    const url = `${apiUrl}/course/`;
    return this.http.get(url, httpOptions);
  }

  getUserCourse(studentID: string): Observable<any> {
    const url = `${apiUrl}/course/${studentID}`;
    return this.http.get(url, httpOptions);
  }

  getMoreCourses(ids: string[]): Observable<any> {
    const url = `${apiUrl}/course/${ids}`;
    return this.http.get(url, httpOptions);
  }

  getOtherCourses(id: string[]): Observable<any> {
    if ( id.length > 0) {
      const url = `${apiUrl}/courses/not/${id}`;
      return this.http.get(url, httpOptions);
    } else {
      const url = `${apiUrl}/course`;
      return this.http.get(url, httpOptions);
    }

  }

  postCourse(info): Observable<any> {
    const url = `${apiUrl}/course/`;
    return this.http.post(url, info, httpOptions);
  }

  updateCourse(studentID: string, info): Observable<any> {
    const url = `${apiUrl}/course/${studentID}`;
    return this.http.put(url, info, httpOptions);
  }
  enrollCourse(studentID: string, courseID: string): Observable<any> {
    const url = `${apiUrl}/enroll/users/${studentID}/course/${courseID}`;
    return this.http.post(url, httpOptions);
  }

  dropCourse(studentID: string, courseID: string): Observable<any> {
    const url = `${apiUrl}/drop/users/${studentID}/course/${courseID}`;
    return this.http.post(url, httpOptions);
  }

}
