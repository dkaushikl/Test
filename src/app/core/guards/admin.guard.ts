import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from '../service';
@Injectable()
export class AdminGuard implements CanActivate {
    isAdmin = false;
    constructor(private router: Router, public adminService: AdminService) {
        if (localStorage.getItem('token')) {
            this.adminService.isAdmin().subscribe((res: any) => {
                this.isAdmin = res.usertype === 'Admin' ? true : false;
            });
        }
    }
    canActivate() {
        if (this.isAdmin === true) {
            return true;
        }
        this.router.navigate(['/page/home']);
        return false;
    }
}
