import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class ProjectService {

    constructor(private http: HttpClient, public httpService: HttpService) { }

    getProjectDataFilter(obj: any) {
        return this.http.post(environment.apiUrl + 'GetProjectFilter', obj, this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getProject() {
        return this.http.get(environment.apiUrl + 'Project',  this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getallTeamleader() {
        return this.http.get(environment.apiUrl + `getallTeamleader`,  this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    deleteProject(obj: any) {
        return this.http.delete(environment.apiUrl + 'Project/' + obj.id,  this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    addProject(obj: any) {
        return this.http.post(environment.apiUrl + 'Project', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }
    ProjectById(obj: any) {
        return this.http.get(environment.apiUrl + 'Project/' + obj.id, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    getallClientRefrence() {
        return this.http.get(environment.apiUrl + 'GetClientrefrence',  this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    getallClientCountry() {
        return this.http.get(environment.apiUrl + 'GetClientCountry',  this.httpService.GetJsonHttpCommon())
            .pipe(map(response => response));
    }

    UpdateProfile(obj: any) {
        return this.http.post(environment.apiUrl + 'Project', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

   




}
