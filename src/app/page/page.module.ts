import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { SupportticketComponent } from './supportticket/supportticket.component';
import { SelectModule } from 'ng-select';

import { AddEmployeeComponent } from './add-emoloyee/add-emoloyee.component';
import { LeavedetailComponent } from './leavedetail/leavedetail.component';
import { ProjectComponent } from './project/project.component';
import { EmployeeComponent } from './employee/employee.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AdminGuard } from '../core/guards';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'Employee', component: EmployeeComponent, canActivate: [AdminGuard] },
  { path: 'ListEmployee', component: AddEmployeeComponent, canActivate: [AdminGuard] },
  { path: 'leaveDetaile', component: LeavedetailComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'addproject', component: AddProjectComponent, canActivate: [AdminGuard] },
  { path: 'timer', component: TimerComponent, canActivate: [AdminGuard] },
  { path: 'support-ticket', component: SupportticketComponent }
];
@NgModule({
  declarations: [
    HomeComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    LeavedetailComponent,
    ProjectComponent,
    TimesheetComponent,
    AddProjectComponent,
    SupportticketComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    FormsModule,
    NgxDatatableModule,
    MatMenuModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    MatExpansionModule,
    SelectModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PageModule { }
