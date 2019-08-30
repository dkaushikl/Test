import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-forgetpassword-link',
  templateUrl: './forgetpassword-link.component.html',
  styleUrls: ['./forgetpassword-link.component.css']
})
export class ForgetpasswordLinkComponent implements OnInit {
  [x: string]: any;
  public resetpassword: FormGroup;
  isLogin = false;
  dataList: any;
  arrayData: any;
  Token: any;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
     private toastr: ToastrService, public adminService: AdminService, private router: Router) {
    this.resetpassword = this.fb.group({
      Password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    $('.header').hide();
    $('.slider').hide();
    if (
      localStorage.getItem('token') &&
      this.router.url === '/ui/forgetPassword'
    ) {
      this.router.navigate(['/page/home']);
    }
    this.activatedRoute.params.forEach((params: Params) => {
      this.Token = params.id;
    });
  }

  submit(obj: any, isvalid: any) {
    this.isLogin = true;
    if (isvalid) {
      const newObj = {
        Password: obj.Password,
        Token: this.Token
      };
      this.adminService.forgetPasswordlink(newObj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }
}
