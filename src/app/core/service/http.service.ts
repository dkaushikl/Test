import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
    GetAuthHttpCommon() {
        const currentUser = localStorage.getItem('token');
        return {
            headers: new HttpHeaders().set('Authorization', currentUser).set('Content-Type', 'application/json')
        };
    }

    GetJsonHttpCommon() {
        const currentUser = localStorage.getItem('token');
        return {
            headers: new HttpHeaders().set('Authorization', currentUser)
        };
    }

    GetHttpCommon() {
        return {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        };
    }

    GetOnlyAuth() {
        const token = JSON.stringify(localStorage.getItem('token'));
        return {
            headers: new HttpHeaders().set('token', token)
        };
    }
}
