import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../core/service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public LoginForm: FormGroup;
  isLogin = false;
  dataList: any;
  arrayData: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService, public adminService: AdminService, private router: Router) {
    this.LoginForm = this.fb.group({
      Email: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    $('.header').hide();
    $('.slider').hide();
    if (localStorage.getItem('token') && this.router.url === '/login') {
      this.router.navigate(['/page/home']);
    }
  }

  submit(obj: any, isValid: boolean) {
    this.isLogin = true;
    if (isValid) {
      this.adminService.Login(obj).subscribe((res: any) => {
        if (res.ReturnCode === '1') {
          localStorage.setItem('token', res.token);
          // this.router.navigate(['/page/home']);
          window.location.href = '/page/home';
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }
}


