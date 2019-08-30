import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/core/service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { LoaderService } from 'src/app/core/Loder/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('toggle', { static: false }) toggle: ElementRef;
  public hours = '00';
  public mins = '00';
  public secs = '00';
  public totalhours = '00';
  public totalmins = '00';
  public totalsecs = '00';
  timeStart = 0;
  public timer = null;
  public ButtonName = 'Start';
  public message;
  public toggler = false;
  public profileData;
  totaltime = 0;
  imageEnvironment = environment.imgurl;
  isAdmin: boolean;

  constructor(public adminService: AdminService) {
    this.checkUser();
  }

  ngOnInit() {
    // if (this.isAdmin === false) {
    //   this.adminService.gettimer().subscribe((res: any) => {
    //     if (res.ReturnCode === 1) {
    //       this.totaltime = res.totaltime;
    //       const totalhours = Math.floor(res.totaltime / 60);
    //       const totalmins = Math.floor(res.totaltime);
    //       if (totalhours < 10) { this.totalhours = '0' + totalhours; } else { this.totalhours = '' + totalhours; }
    //       if (totalmins < 10) { this.totalmins = '0' + totalmins; } else { this.totalmins = '' + totalmins; }
    //       if (res.data.status === 'Started') {
    //         this.toggle.nativeElement.checked = true;
    //         const duration = moment.duration(moment(moment().format())
    //           .diff(moment(res.data.sessions[res.data.sessions.length - 1].startAt)));
    //         const minut = duration.asMinutes();
    //         this.timeStart = minut * 60;
    //         this.toggler = true;
    //         this.timer = setInterval(() => {
    //           this.timeStart++;
    //           let remain = this.timeStart;
    //           const hours = Math.floor(remain / 3600);
    //           remain -= hours * 3600;
    //           const mins = Math.floor(remain / 60);
    //           remain -= mins * 60;
    //           const secs = remain;
    //           if (hours < 10) { this.hours = '0' + hours; } else { this.hours = '' + hours; }
    //           if (mins < 10) { this.mins = '0' + mins; } else { this.mins = '' + mins; }
    //           if (secs < 10) { this.secs = '0' + secs; } else { this.secs = '' + secs; }
    //         }, 1000);
    //         this.ButtonName = 'Stop';
    //       } else {
    //         clearInterval(this.timer);
    //         this.timer = null;
    //         this.toggler = false;
    //       }
    //     }
    //   });
    // }
  }

  togglerOnOff() {
    // this.adminService.timer().subscribe((res: any) => {
    // });
    // if (this.toggler === false) {
    //   this.timer = setInterval(() => {
    //     this.timeStart++;
    //     let remain = this.timeStart;
    //     const hours = Math.floor(remain / 3600);
    //     remain -= hours * 3600;
    //     const mins = Math.floor(remain / 60);
    //     remain -= mins * 60;
    //     const secs = remain;
    //     if (hours < 10) { this.hours = '0' + hours; } else { this.hours = '' + hours; }
    //     if (mins < 10) { this.mins = '0' + mins; } else { this.mins = '' + mins; }
    //     if (secs < 10) { this.secs = '0' + secs; } else { this.secs = '' + secs; }
    //   }, 1000);
    //   this.ButtonName = 'Stop';
    //   this.toggler = true;
    // } else {
    //   clearInterval(this.timer);
    //   this.timer = null;
    //   this.toggler = false;
    // }
  }

  Logout() {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = '/Login';
    }, 1000);
  }

  checkUser() {
    if (localStorage.getItem('token')) {
      this.adminService.isAdmin().subscribe((res: any) => {
        this.isAdmin = res.usertype === 'Admin' ? true : false;
      });
    }

  }

}
