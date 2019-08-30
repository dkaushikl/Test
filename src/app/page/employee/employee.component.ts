import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeeDetaile;
  public photo;
  selectedItem: any = null;
  rows = [];
  imageEnvironment = environment.imgurl;
  isAdmin = false;
  myOptions = [];

  constructor(
    public employeeService: EmployeeService, private toastr: ToastrService, private router: Router) {
  }

  employeeList(obj) {
    this.employeeDetaile = obj;
  }

  image(obj) {
    this.photo = obj;
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getEmployee();
  }

  SerchEmployee(event: any) {
    const obj = {
      SearchText: event.target.value
    };
    this.employeeService.getEmployeeFilter(obj).subscribe((res: any) => {
      this.rows = res;
    });
  }

  getEmployee() {
    this.employeeService.getemployeedetail().subscribe((res: any) => {
      this.rows = res.data;
      this.isAdmin = res.Role === 'Admin' ? true : false;
    });
  }

  deleteEmployee(id) {
    const obj = {
      id
    };
    this.employeeService.deleteemployeedetail(obj).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.getEmployee();
    });
  }

  updateEmployee(obj) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        obj
      }
    };
    this.router.navigate(['/page/ListEmployee'], navigationExtras);
  }

  downlodImage(url) {
    const link = document.createElement('a');
    link.href = this.imageEnvironment + 'getdata/' + url;
    link.target = '_blank';
    link.download = url.split('upload/')[1];
    link.click();
  }
}
