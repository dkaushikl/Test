import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;

  profile: FormGroup;
  isprofile = false;

  options: Array<IOption>;
  public profileData;
  public adminprofile = false;
  public skillName;
  public Skill: Array<IOption>;
  profileimage: File = null;
  imageEnvironment = environment.imgurl;

  constructor(private fb: FormBuilder, private toastr: ToastrService, public employeeService: EmployeeService) {
    this.profile = this.fb.group({
      phone: ['', Validators.compose([Validators.required])],
      ProfileSkills: [''],
      profileimage: ['']
    });
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getSkill();
    this.getProfileData();
  }

  getSkill() {
    this.employeeService.getSkill().subscribe((res: any) => {
      const test = [];
      res.forEach((item) => {
        const options = {
          value: item._id,
          label: item.Name
        };
        test.push(options);
      });
      this.options = test;
    });
  }

  getProfileData() {
    this.employeeService.getDataFindById().subscribe((res: any) => {
      this.profileData = res.data;
      this.skillName = res.skill;
      this.adminprofile = res.data.Role === 'Admin' ? true : false;
      const test = [];
      res.skill.forEach((item) => {
        const options = {
          value: item._id,
          label: item.Name
        };
        test.push(options);
      });
      this.Skill = test;
      this.updateprofiledata();
    });
  }

  updateprofiledata() {
    this.profile.get('phone').setValue(this.profileData.Phoneno ? this.profileData.Phoneno : '');
    this.profile.get('ProfileSkills').setValue(this.skillName.map(x => x._id));
  }

  profileImage(files: FileList) {
    this.profileimage = files.item(0);
  }

  ProfilePhotoChange(files: FileList) {
    this.profileimage = files.item(0);
    const formData = new FormData();
    formData.append('Profileimage', this.profileimage);
    formData.append('Skill', '');
    formData.append('IsProfileimage', '1');
    this.employeeService.profileUpdate(formData).subscribe((res: any) => {
      if (res.ReturnCode === 1) {
        this.toastr.success(res.message);
        this.getProfileData();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  submit(obj: any, isValid: boolean) {
    this.isprofile = true;
    if (isValid) {
      obj.IsProfileimage = this.profileimage ? 1 : 0;
      const formData = new FormData();
      formData.append('Phoneno', obj.phone);
      formData.append('Skill', obj.ProfileSkills ? obj.ProfileSkills : '');
      formData.append('IsProfileimage', obj.IsProfileimage);
      formData.append('Profileimage', this.profileimage);
      // formData.forEach((value, key) => {
      //   console.log(key + '' + value);
      // });
      this.employeeService.profileUpdate(formData).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.getProfileData();
          this.getSkill();
          this.closeBtn.nativeElement.click();
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

}
