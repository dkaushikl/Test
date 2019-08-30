import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/core/service';
import { NavigationExtras, Router } from '@angular/router';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild('emptypeModel', { static: false }) emptypeModel: ElementRef;
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  filterData: FormGroup;
  public rows = [];
  isAdmin = false;
  options: Array<IOption>;
  constructor(private fb: FormBuilder, private toastr: ToastrService, public projectService: ProjectService, private router: Router) {
    this.filterData = this.fb.group({
      Search: new FormControl('', []),
      type: new FormControl('', []),
    });
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getProjectData();
    this.getallTeamleader();
  }

  getProjectDataFilter(obj: any) {
    const newobj = {
      Type: obj.type,
      SearchDate: obj.Search ? obj.Search : null
    };
    this.projectService.getProjectDataFilter(newobj).subscribe((res: any) => {
      this.rows = res;
    });
  }

  getProjectData() {
    this.projectService.getProject().subscribe((res: any) => {
      this.isAdmin = res.Role === 'Admin' ? true : false;
      this.rows = res.Data;
      this.cleatInputboxFillter();
    });
  }

  getallTeamleader() {
    const test = [];
    this.projectService.getallTeamleader().subscribe((res: any) => {
      res.forEach((item) => {
        const options = {
          value: item.EmployeeID,
          label: item.Name,
        };
        test.push(options);
      });
      this.options = test;
    });
  }

  deleteProject(id) {
    const obj = {
      id
    };
    this.projectService.deleteProject(obj).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.getProjectData();
    });
  }


  cleatInputboxFillter() {
    this.filterData.reset();
  }

  updateproject(obj) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        obj
      }
    };
    this.router.navigate(['/page/addproject'], navigationExtras);
  }

}
