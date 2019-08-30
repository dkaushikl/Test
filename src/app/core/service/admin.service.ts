import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient, public httpService: HttpService) { }

  Login(obj: any) {
    return this.http.post(environment.apiUrl + 'Login', obj)
      .pipe(map(response => response));
  }

  forgetPasswordlink(obj: any) {
    return this.http.post(environment.apiUrl + 'ForgetPasswordlink', obj)
      .pipe(map(response => response));
  }

  forgetPassword(obj: any) {
    return this.http.post(environment.apiUrl + 'ForgetPassword', obj)
      .pipe(map(response => response));
  }

  changepassword(obj: any) {
    return this.http.post(environment.apiUrl + 'Changepassword', obj, this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }
  timer() {
    return this.http.get(environment.apiUrl + 'tracker', this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }

  stopTimer() {
    return this.http.get(environment.apiUrl + 'stopTimer', this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }

  gettimer() {
    return this.http.get(environment.apiUrl + 'timer', this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }

  totalProjectandLeave() {
    return this.http.get(environment.apiUrl + 'TotalProjectandLeave', this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }

  userTimeLog() {
    return this.http.get(environment.apiUrl + 'userTimeLog', this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }

  getAllTimer() {
    return this.http.get(environment.apiUrl + 'timer', this.httpService.GetAuthHttpCommon()).pipe(
      map(response => response));
  }

  isAdmin() {
    return this.http.get(environment.apiUrl + 'IsAdminCheck', this.httpService.GetJsonHttpCommon()).pipe(
      map(response => response));
  }
}
