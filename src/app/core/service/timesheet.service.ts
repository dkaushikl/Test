import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class TimeSheetService {

    constructor(private http: HttpClient, public httpService: HttpService) { }
    filterProjectTask(obj) {
        return this.http.post(environment.apiUrl + 'FilterProjectTask', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    getTimeSheetTask() {
        return this.http.get(environment.apiUrl + 'timeSheet',  this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    getProjectdetail() {
        return this.http.get(environment.apiUrl + 'GetProjectoption',  this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    deleteTimesheet(obj: any) {
        return this.http.delete(environment.apiUrl + 'timeSheet/' + obj.TimesheetID, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    adminfilterProjectTask(obj) {
        return this.http.post(environment.apiUrl + 'AdminFilterProjectTask', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

    addtimesheetTask(obj) {
        return this.http.post(environment.apiUrl + 'timeSheet', obj, this.httpService.GetAuthHttpCommon())
            .pipe(map(response => response));
    }

}
