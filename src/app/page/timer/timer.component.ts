import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service';
declare var $: any;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {
  public rows = [];
  isAdmin: boolean;

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
  }

  // getallDataTimer() {
  //   this.adminService.getAllTimer().subscribe((res: any) => {
  //     this.isAdmin = res.Role === 'Admin' ? true : false;
  //     this.rows = res.data;
  //   });
  // }
}


