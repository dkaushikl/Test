import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class LeaveService {
    constructor(private http: HttpClient, public httpService: HttpService) { }

    addleavedetail(obj: any) {
        return this.http.post(environment.apiUrl + 'AddEmployeeLeave', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    EmployeeleaveDetail() {
        return this.http.get(environment.apiUrl + 'leave', this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getLeavefilter(obj: any) {
        return this.http.post(environment.apiUrl + 'GetLeaveFilter', obj)
            .pipe(map(response => response));
    }

    deleteleave(obj) {
        return this.http.delete(environment.apiUrl + 'leave/' + obj.LeaveId, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    changeLeaveStatus(obj: any) {
        return this.http.post(environment.apiUrl + 'ChangeLeaveStatus', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }


    getleaveReson() {
        return this.http.post(environment.apiUrl + 'GetLeaveResonData', this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }





}
