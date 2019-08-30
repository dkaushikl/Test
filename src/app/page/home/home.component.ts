import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isAdmin = false;
  public Role;
  public totalHours = '00';
  public totalMins = '00';
  totaltime = 0;
  public rows = [];
  public totalProject = [];

  constructor(public adminService: AdminService) {
    this.totalprojectleave();
    this.getTimer();
    // this.userTimeLog();
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
  }

  getTimer() {
    this.adminService.gettimer().subscribe((res: any) => {
      if (res.ReturnCode === 1) {
        this.totaltime = res.totaltime;
        const totalHours = Math.floor(res.totaltime / 60);
        const totalMins = Math.floor(res.totaltime);
        if (totalHours < 10) { this.totalHours = '0' + totalHours; } else { this.totalHours = '' + totalHours; }
        if (totalMins < 10) { this.totalMins = '0' + totalMins; } else { this.totalMins = '' + totalMins; }
      }
    });
  }

  totalprojectleave() {
    this.adminService.totalProjectandLeave().subscribe((res: any) => {
      this.totalProject.push(res);
      this.isAdmin = res.Role === 'Admin' ? true : false;
    });
  }

  // userTimeLog() {
  //   this.adminService.userTimeLog().subscribe((res: any) => {
  //     this.rows = res.data;
  //   });
  // }
}
