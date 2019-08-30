import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { TimeSheetService } from 'src/app/core/service';
declare var $: any;

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  @ViewChild('time', { static: false }) time: ElementRef;

  task: FormGroup;
  filterData: FormGroup;
  adminfilter: FormGroup;
  istask = false;
  options: Array<IOption>;

  rows = [];

  isAdmin: boolean;

  bsValue = new Date();
  isMeridian = false;
  showSpinners = true;
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    public timeSheetService: TimeSheetService) {
    this.task = this.fb.group({
      Project: ['', Validators.compose([Validators.required])],
      Addtask: ['', Validators.compose([Validators.required])],
      date: [new Date(), Validators.compose([Validators.required])],
      time: ['', Validators.compose([Validators.required])]
    });
    this.filterData = this.fb.group({
      Search: new FormControl('', []),
      type: new FormControl('', []),
      SearchDate: new FormControl('', [])
    });

    this.adminfilter = this.fb.group({
      adminSearch: new FormControl('', []),
      adminSerchDate: new FormControl('', []),
      admintype: new FormControl('', [])
    });
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getProject();
    this.getTimeSheetData();
  }

  filtertask(obj: any) {
    const newobj = {
      Search: obj.Search ? obj.Search.toLowerCase() : null,
      Type: obj.type
    };
    this.timeSheetService.filterProjectTask(newobj).subscribe((res: any) => {
      this.rows = res;
    });
  }

  getTimeSheetData() {
    this.timeSheetService.getTimeSheetTask().subscribe((res: any) => {
      this.rows = res.reverse();
      this.cleatInputboxFillter();
    });
  }

  getProject() {
    const test = [];
    this.timeSheetService.getProjectdetail().subscribe((res: any) => {
      this.isAdmin = res.Role === 'Admin' ? true : false;
      res.data.forEach((item) => {
        const options = {
          value: item.ProjectID,
          label: item.ProjectName,
        };
        test.push(options);
      });
      this.options = test;
    });
  }

  deleteTimesheet(obj: any) {
    const newobj = {
      TimesheetID: obj
    };
    this.timeSheetService.deleteTimesheet(newobj).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.getTimeSheetData();
    });
  }

  submit(obj: any, valid: any) {
    this.istask = true;
    if (valid) {
      const newObj = {
        EmployeeID: JSON.parse(sessionStorage.getItem('UserID')),
        ProjectId: obj.Project,
        Addtask: obj.Addtask,
        Time: obj.time,
        Date: formatDate(obj.date, 'MM/dd/yyyy', 'en'),
      };
      this.timeSheetService.addtimesheetTask(newObj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.task.reset();
          this.time['defaultTime'] = '00 : 00';
          this.getTimeSheetData();
          this.task.get('date').setValue(this.bsValue);
        } else {
          this.toastr.error(res.message);
        }
      });
      this.istask = false;
    }
  }

  cleatInputboxFillter() {
    this.filterData.reset();
    this.adminfilter.reset();
  }

  adminfilterProjectTask(obj: any) {
    const newobj = {
      Type: obj.admintype,
      Search: obj.adminSearch ? obj.adminSearch.toLowerCase() : null,
      FromDate:
        obj && obj.adminSerchDate
          ? formatDate(obj.adminSerchDate[0], 'MM/dd/yyyy', 'en')
          : '',
      ToDate:
        obj && obj.adminSerchDate
          ? formatDate(obj.adminSerchDate[1], 'MM/dd/yyyy', 'en')
          : ''
    };
    this.timeSheetService.adminfilterProjectTask(newobj).subscribe((res: any) => {
      this.rows = res;
    });
  }
}
