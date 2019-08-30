import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean;
  constructor(public adminService: AdminService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.adminService.isAdmin().subscribe((res: any) => {
        this.isAdmin = res.usertype === 'Admin' ? true : false;
      });
    }
  }
}
