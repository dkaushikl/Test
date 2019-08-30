import { formatDate } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from 'src/app/core/service';
import { Employee } from 'src/app/shared/model/admin';
import { environment } from '../../../environments/environment';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-emoloyee.component.html',
  styleUrls: ['./add-emoloyee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  @ViewChild('emptypeFilter', { static: false }) emptypeFilter: ElementRef;
  maxDate: Date;
  employee: FormGroup;
  updateEmployee: Employee;
  isLogin = false;
  photoupdateAdhar = false;
  photoupdatepan = false;
  DesignationOptions: Array<IOption>;
  selectedaadharFile: File = null;
  selectedpanFile: File = null;
  selectedresumeFile: File = null;
  public imagePanCardPath;
  public imageAdharCardPath;
  imgPanCardUrl: any;
  imgAadharCardUrl: any;
  messageAadhar: string;
  messagesPan: string;
  AadharPhoto: File = null;
  PanPhoto: File = null;
  Resume: File = null;
  test: string;
  id: number;
  imageEnvironment = environment.imgurl;


  constructor(private fb: FormBuilder, private toastr: ToastrService, public employeeService: EmployeeService
    , private activatedRoute: ActivatedRoute) {
    this.employee = this.fb.group({
      Fname: new FormControl('', [Validators.required]),
      Lname: new FormControl('', [Validators.required]),
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Address: new FormControl('', [Validators.required]),
      Phoneno: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      TotalExperience: new FormControl('', [Validators.required]),
      Salary: new FormControl('', [Validators.required]),
      Designation: new FormControl('', [Validators.required]),
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      DOB: ['', Validators.compose([Validators.required])],
      DOJ: ['', Validators.compose([Validators.required])],
      Refrence: [''],
      DOL: [''],
      Panno: ['', Validators.compose([Validators.minLength(10)])],
      Aadharno: ['', Validators.compose([Validators.minLength(16)])],
      AadharPhoto: [''],
      PanPhoto: [''],
      Resume: [''],
    });
    this.maxDate = new Date();
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getDesignationData();
    this.test = '1';
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params.obj;
    });
    const obj = {
      id: this.id
    };
    if (this.id) {
      this.employeeService.getemployeedetailbyid(obj).subscribe((res: any) => {
        this.updateEmployee = res.data;
        if (this.updateEmployee && this.updateEmployee._id) {
          this.updateDataDetail();
        }
      });
    }

  }
  updateDataDetail() {
    this.employee.get('Fname').setValue(this.updateEmployee.Fname ? this.updateEmployee.Fname : '');
    this.employee.get('Lname').setValue(this.updateEmployee.Lname ? this.updateEmployee.Lname : '');
    this.employee.get('Email').setValue(this.updateEmployee.Email ? this.updateEmployee.Email : '');
    this.employee.get('Address').setValue(this.updateEmployee.Address ? this.updateEmployee.Address : '');
    this.employee.get('Phoneno').setValue(this.updateEmployee.Phoneno ? this.updateEmployee.Phoneno : '');
    this.employee.get('Refrence').setValue(this.updateEmployee.Refrence ? this.updateEmployee.Refrence : '');
    this.employee.get('TotalExperience').setValue(this.updateEmployee.TotalExperience ? this.updateEmployee.TotalExperience : '');
    this.employee.get('Salary').setValue(this.updateEmployee.Salary ? this.updateEmployee.Salary : '');
    this.employee.get('Panno').setValue(this.updateEmployee.Panno ? this.updateEmployee.Panno : '');
    this.employee.get('Aadharno').setValue(this.updateEmployee.Aadharno ? this.updateEmployee.Aadharno : '');
    this.employee.get('DOB').setValue(this.updateEmployee.DOB ? this.updateEmployee.DOB : '');
    this.employee.get('DOJ').setValue(this.updateEmployee.DOJ ? this.updateEmployee.DOJ : '');
    this.employee.get('DOL').setValue(this.updateEmployee.DOL ? this.updateEmployee.DOL : '');
    this.employee.get('Designation').setValue(this.updateEmployee.DesignationID);
    this.employee.get('AadharPhoto').clearValidators();
    this.employee.get('AadharPhoto').updateValueAndValidity();
    this.employee.get('Resume').clearValidators();
    this.employee.get('Resume').updateValueAndValidity();
    this.employee.get('PanPhoto').clearValidators();
    this.employee.get('PanPhoto').updateValueAndValidity();
    this.employee.get('Password').clearValidators();
    this.employee.get('Password').updateValueAndValidity();
  }

  onResumeSelected(files: FileList) {
    this.Resume = files.item(0);
  }

  previewPanCard(files: FileList) {
    this.photoupdatepan = true;
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messagesPan = 'only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePanCardPath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (this.updateEmployee && this.updateEmployee.UserID) {
        this.updateEmployee.PanPhoto = this.imgPanCardUrl = reader.result;
      }
      this.imgPanCardUrl = reader.result;
    };
    this.PanPhoto = files.item(0);
  }

  previewAadharCard(files: FileList) {
    this.photoupdateAdhar = true;
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageAadhar = 'only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imageAdharCardPath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (this.updateEmployee && this.updateEmployee.UserID) {
        this.updateEmployee.AadharPhoto = this.imgPanCardUrl = reader.result;
      }
      this.imgAadharCardUrl = reader.result;
    };
    this.AadharPhoto = files.item(0);
  }



  getDesignationData() {
    this.employeeService.getdesignation().subscribe((res: any) => {
      const test = [];
      res.forEach((item) => {
        const data = {
          value: item._id,
          label: item.Name
        };
        test.push(data);
      });
      this.DesignationOptions = test;

    });
  }

  submit(obj: any, isValid: boolean) {
    this.isLogin = true;
    if (isValid) {
      obj.DOB = formatDate(obj.DOB, 'MM/dd/yyyy', 'en');
      obj.DOJ = formatDate(obj.DOJ, 'MM/dd/yyyy', 'en');
      obj.DOL = obj.DOL ? formatDate(obj.DOL, 'MM/dd/yyyy', 'en') : '';
      const formData = new FormData();
      formData.append('Fname', obj.Fname);
      formData.append('Lname', obj.Lname);
      formData.append('Email', obj.Email);
      formData.append('Address', obj.Address);
      formData.append('Password', obj.Password);
      formData.append('Phoneno', obj.Phoneno);
      formData.append('Refrence', obj.Refrence);
      formData.append('TotalExperience', obj.TotalExperience);
      formData.append('Salary', obj.Salary);
      formData.append('Designation', obj.Designation);
      formData.append('Panno', obj.Panno);
      formData.append('Aadharno', obj.Aadharno);
      formData.append('DOB', obj.DOB);
      formData.append('DOJ', obj.DOJ);
      formData.append('DOL', obj.DOL);
      formData.append('AadharPhoto', this.AadharPhoto);
      formData.append('PanPhoto', this.PanPhoto);
      formData.append('Resume', this.Resume);
      // new Response(formData).text().then(console.log);
      // formData.forEach((value, key) => {
      //   console.log(key + '' + value);
      // });
      if (!this.updateEmployee) {
        this.employeeService.addemployeedetail(formData).subscribe((res: any) => {
          if (res.ReturnCode === 1) {
            this.toastr.success(res.message);
            this.employee.reset();
            this.imgAadharCardUrl = null;
            this.imgPanCardUrl = null;
          } else {
            this.toastr.error(res.message);
          }
        });
      } else {
        obj.EmployeeID = this.id;
        obj.IsAadharUpdate = obj.AadharPhoto ? 1 : 0;
        obj.IsPanUpdate = obj.PanPhoto ? 1 : 0;
        obj.IsResumeUpdate = obj.Resume ? 1 : 0;
        formData.append('EmployeeID', obj.EmployeeID);
        formData.append('IsAadharUpdate', obj.IsAadharUpdate);
        formData.append('IsPanUpdate', obj.IsPanUpdate);
        formData.append('IsResumeUpdate', obj.IsResumeUpdate);
        this.employeeService.addemployeedetail(formData).subscribe((res: any) => {
          if (res.ReturnCode === 1) {
            this.toastr.success(res.message);
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      this.isLogin = false;
    }
  }
}
