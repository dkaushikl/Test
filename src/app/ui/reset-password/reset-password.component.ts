import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/Loder/loader.service';
declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  public resetpassword: FormGroup;
  isLogin = false;
  dataList: any;
  arrayData: any;

  constructor(private fb: FormBuilder, public adminService: AdminService,
    private toastr: ToastrService, private router: Router) {
    this.resetpassword = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    $('.header').hide();
    $('.slider').hide();
    if (localStorage.getItem('token') && this.router.url === '/ui/forgetPassword') {
      this.router.navigate(['/page/home']);
    }
  }

  submit(obj: any, isValid: boolean) {
    this.isLogin = true;
    if (isValid) {
      this.adminService.forgetPassword(obj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }
}
