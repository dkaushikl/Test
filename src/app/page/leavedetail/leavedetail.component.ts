import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { LeaveService } from 'src/app/core/service';
import { IOption } from 'ng-select';

declare var $: any;

@Component({
  selector: 'app-leavedetail',
  templateUrl: './leavedetail.component.html',
  styleUrls: ['./leavedetail.component.css']
})
export class LeavedetailComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  @ViewChild('closeBtnDecline', { static: false }) closeBtnDecline: ElementRef;
  @ViewChild('closeBtnAccept', { static: false }) closeBtnAccept: ElementRef;

  leave: FormGroup;
  filterData: FormGroup;
  isLeaveData = false;
  private StatusId;
  private StatusCode;

  leavetypeOptions: Array<IOption>;
  rows = [];
  isAdmin = true;

  constructor(private fb: FormBuilder, private toastr: ToastrService, public leaveService: LeaveService) {
    this.leave = this.fb.group({
      leavereasons: ['', Validators.compose([Validators.required])],
      leavetype: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      otherremark: ['', Validators.compose([Validators.required])]
    });
    this.filterData = this.fb.group({
      Search: new FormControl('', []),
      type: new FormControl('', []),
    });

  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getLeaveData();
    this.EmployeeleaveDetail();
  }


  submit(obj: any, isValid: boolean) {
    this.isLeaveData = true;
    if (isValid) {
      const newObj = {
        Type: obj.leavetype,
        FromDate: formatDate(obj.date[0], 'MM/dd/yyyy', 'en'),
        ToDate: formatDate(obj.date[1], 'MM/dd/yyyy', 'en'),
        Reason: obj.leavereasons,
        Reamrks: obj.otherremark
      };
      this.leaveService.addleavedetail(newObj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.EmployeeleaveDetail();
          this.closeBtn.nativeElement.click();
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

  EmployeeleaveDetail(obj?: any) {
    this.leaveService.EmployeeleaveDetail().subscribe((res: any) => {
      this.isAdmin = res.Role === 'Admin' ? true : false;
      this.rows = res.data.reverse();
      this.cleatInputboxFillter();
    });
  }

  SearchleaveEmployee(obj: any) {
    const newobj = {
      Type: obj ? obj.type : null,
      SearchText: obj.Search ? obj.Search : null
    };
    this.leaveService.getLeavefilter(newobj).subscribe((res: any) => {
      this.rows = res;
    });
  }

  deleteleave(id) {
    const obj = {
      LeaveId: id
    };
    this.leaveService.deleteleave(obj).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.EmployeeleaveDetail();
    });
  }

  clearModelInputbox() {
    this.isLeaveData = false;
    this.leave.reset();
  }

  cleatInputboxFillter() {
    this.filterData.reset();
  }

  getLeaveData() {
    this.leaveService.getleaveReson().subscribe((res: any) => {
      const test = [];
      res.forEach((item) => {
        const data = {
          value: item._id,
          label: item.Name
        };
        test.push(data);
      });
      this.leavetypeOptions = test;

    });
  }


  acceptsubmit(event: any) {
    const Obj = {
      id: this.StatusId,
      statusCode: this.StatusCode,
      AdminCommite: event.target.accept.value
    };
    this.leaveService.changeLeaveStatus(Obj).subscribe((res: any) => {
      if (res.ReturnCode === 1) {
        this.closeBtnAccept.nativeElement.click();
        this.toastr.success(res.message);
        this.EmployeeleaveDetail();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  declinesubmit(event: any) {
    const Obj = {
      id: this.StatusId,
      statusCode: this.StatusCode,
      AdminCommite: event.target.decline.value
    };
    this.leaveService.changeLeaveStatus(Obj).subscribe((res: any) => {
      if (res.ReturnCode === 1) {
        this.closeBtnDecline.nativeElement.click();
        this.toastr.success(res.message);
        this.EmployeeleaveDetail();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  Decline(obj: any, statusCode: any) {
    this.StatusId = obj;
    this.StatusCode = statusCode;
  }


  Accept(obj: any, statusCode: any) {
    this.StatusId = obj;
    this.StatusCode = statusCode;
  }




}
