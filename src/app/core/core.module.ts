import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, AdminGuard } from './guards';
import { AdminService, HttpService, EmployeeService, LeaveService, TimeSheetService, SupportTicketService } from './service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpinterceptor.service';
import { LoaderComponent } from './Loder/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService } from './service/project.service';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    HttpService,
    AdminService,
    EmployeeService,
    ProjectService,
    LeaveService,
    TimeSheetService,
    SupportTicketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
  ],
  exports: [LoaderComponent]
})
export class CoreModule { }

