import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


// tslint:disable-next-line:class-name
export interface studentInfo {
  studentName: string;
  studentID: string;
  studentEmail: string;
  studentAddress: string;
  studentPhone: string;
  iat: number;
  exp: number;
}

interface TokenResp {
  token: string;
}

export interface TokenPayload {
  studentName: string;
  studentEmail: string;
  studentPassword: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  public LoggedIn(): boolean {
    const student = this.getStudentInfo();
    if (student) {
      return student.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getStudentID(): string {
    const user = this.getStudentInfo();
    if (this.LoggedIn()) {
      return user.studentID;
    }
  }

  public getStudentInfo(): studentInfo {
    const token = this.getStudentToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public signUp(student: { studentPassword: string; studentEmail: string }): Observable<any> {
    return this.request('put', 'signUp', student);
  }

  public signIn(student: { studentPassword: string; studentEmail: string }): Observable<any> {
    return this.request('put', 'signIn', student);
  }

  public account(): Observable<any> {
    return this.request('get', 'account');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  private saveStudentToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getStudentToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  private request(method: 'put' | 'get', type: 'signIn' | 'signUp' | 'account', students?: { studentPassword: string; studentEmail: string }): Observable<any> {
    let temp;

    if (method === 'put') {
      temp = this.http.post(`/apis/${type}`, students);
    } else {
      temp = this.http.get(`/apis/${type}`, {headers: {Authorization: `Bearer ${this.getStudentToken()}`}});
    }

    const request = temp.pipe(
      map((data: TokenResp) => {
        if (data.token) {
          this.saveStudentToken(data.token);
        }
        return data;
      })
    );

    return request;
  }
}

export class TokenPayload {
}
