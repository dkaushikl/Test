import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class SupportTicketService {
    constructor(private http: HttpClient, public httpService: HttpService) { }


    deleteticket(obj: any) {
        return this.http.post(environment.apiUrl + 'DeleteTicket', obj, this.httpService.GetAuthHttpCommon()).pipe(
            map(response => response));
    }

    addReply(obj: any) {
        return this.http.post(environment.apiUrl + 'AddReply', obj, this.httpService.GetAuthHttpCommon()).pipe(
            map(response => response));
    }

    addsupportTicket(obj: any) {
        return this.http.post(environment.apiUrl + 'ticket', obj, this.httpService.GetAuthHttpCommon()).pipe(
            map(response => response));
    }

    getsupportticketData() {
        return this.http.get(environment.apiUrl + 'ticketbyid', this.httpService.GetAuthHttpCommon()).pipe(
            map(response => response));
    }
}
