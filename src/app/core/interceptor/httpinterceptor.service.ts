import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from '../Loder/loader.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private loaderservice: LoaderService, public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderservice.show();
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loaderservice.hide();
          }

        },
        error => {
          this.router.navigate(['ui/error']);
          if (event instanceof HttpResponse) {
            this.loaderservice.hide();
          } else {
            this.loaderservice.hide();
          }
        }
      )
    );
  }
}



