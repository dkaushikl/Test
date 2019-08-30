import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient, public httpService: HttpService) { }

    addemployeedetail(obj: any) {
        return this.http.post(environment.apiUrl + 'createEmployee', obj, this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    ProjectById(obj: any) {
        return this.http.post(environment.apiUrl + 'ProjectById', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    UpdateProfile(obj: any) {
        return this.http.post(environment.apiUrl + 'CreateProject', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    getemployeedetailbyid(obj: any) {
        return this.http.post(environment.apiUrl + 'employeebyId', obj, this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getEmployeeFilter(obj: any) {
        return this.http.post(environment.apiUrl + 'GetEmployeeFilter', obj, this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getemployeedetail() {
        return this.http.get(environment.apiUrl + 'employee', this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    deleteemployeedetail(obj: any) {
        return this.http.delete(environment.apiUrl + 'employee/' + obj.id, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    getSkill() {
        return this.http.post(environment.apiUrl + 'getallSkill', '1')
            .pipe(map(response => response));
    }

    getDataFindById() {
        return this.http.get(environment.apiUrl + 'employeebyId', this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    profileUpdate(obj: any) {
        return this.http.post(environment.apiUrl + 'UpdateProfile', obj, this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getdesignation() {
        return this.http.get(environment.apiUrl + 'designation', this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }
}
