import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../shared/common/password.validator';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public changepassword: FormGroup;
  isSubmit = false;

  constructor(private fb: FormBuilder,  private toastr: ToastrService, public adminService: AdminService) {
    this.changepassword = this.fb.group({
      oldpassword: ['', Validators.compose([Validators.required])],
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl('', [Validators.required, PasswordValidator.MatchPassword])
    });
  }

  matchingConfirmPasswords(passwordKey: any) {
    const passwordInput = passwordKey.value;
    if (passwordInput.Password === passwordInput.ConfirmPassword) {
      return null;
    } else {
      return passwordKey.controls.ConfirmPassword.setErrors({ passwordNotEquivalent: true });
    }
  }


  ngOnInit() {
    $('.header').show();
    $('.slider').show();
  }

  submit(obj: any, valid: any) {
    this.isSubmit = true;
    if (valid) {
      this.adminService.changepassword(obj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.changepassword.reset();
        } else {
          this.toastr.error(res.message);
        }
        this.isSubmit = false;
      });
    }
  }

}
