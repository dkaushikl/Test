import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/core/service';
import { Project } from 'src/app/shared/model/admin';

declare var $: any;
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project: FormGroup;
  public updateproject: Project;
  public EstimatedHourStatus = false;
  id: number;
  isprojectData = false;

  teamleaderOptions: Array<IOption>;
  clientCountryoptions: Array<IOption>;
  clientCountryRefrence: Array<IOption>;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    public projectService: ProjectService) {
    this.project = this.fb.group({
      projectName: new FormControl('', [Validators.required]),
      clientName: new FormControl('', [Validators.required]),
      clientcountry: new FormControl('', [Validators.required]),
      clientrefrence: new FormControl('', [Validators.required]),
      teamLeader: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      EndDate: new FormControl(''),
      estimatedHours: new FormControl(''),
      adminComment: new FormControl('', [Validators.required]),
      projectType: ['Hourly', [Validators.required]]
    });
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getallTeamleader();
    this.getallClientCountry();
    this.getallClientRefrence();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params.obj;
    });
    const obj = {
      id: this.id
    };
    if(obj.id && obj.id != undefined){
      this.projectService.ProjectById(obj).subscribe((res: any) => {
        this.updateproject = res;
        if (this.updateproject && this.updateproject._id) {
          this.updateDataDetail();
        }
      });
    }
   
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
      this.teamleaderOptions = test;
    });
  }



  getallClientRefrence() {
    const test = [];
    this.projectService.getallClientRefrence().subscribe((res: any) => {
      res.forEach((item) => {
        const options = {
          value: item._id,
          label: item.Name
        };
        test.push(options);
      });
      this.clientCountryRefrence = test;
    });
  }

  getallClientCountry() {
    const test = [];
    this.projectService.getallClientCountry().subscribe((res: any) => {
      res.forEach((item) => {
        const options = {
          value: item._id,
          label: item.Name
        };
        test.push(options);
      });
      this.clientCountryoptions = test;
    });
  }

  EstimatedHoursStatusTrue() {
    this.EstimatedHourStatus = true;
  }

  EstimatedHoursStatusfalse() {
    this.EstimatedHourStatus = false;

  }

  updateDataDetail() {
    this.project.get('projectName').setValue(this.updateproject.projectName ? this.updateproject.projectName : '');
    this.project.get('clientName').setValue(this.updateproject.clientName ? this.updateproject.clientName : '');
    this.project.get('startDate').setValue(this.updateproject.startDate ? this.updateproject.startDate : '');
    this.project.get('estimatedHours').setValue(this.updateproject.estimatedHours ? this.updateproject.estimatedHours : '');
    this.project.get('adminComment').setValue(this.updateproject.adminComment ? this.updateproject.adminComment : '');
    this.project.get('EndDate').setValue(this.updateproject.EndDate ? this.updateproject.EndDate : '');
    this.project.get('clientcountry').setValue(this.updateproject.clientcountry ? this.updateproject.clientcountry : '');
    this.project.get('clientrefrence').setValue(this.updateproject.clientrefrence ? this.updateproject.clientrefrence : '');
    this.project.get('teamLeader').setValue(this.updateproject.teamLeader.map(x => x.id));
    this.project.get('projectType').setValue(this.updateproject.projectType ? this.updateproject.projectType : '');
  }

  submit(obj: any, isValid: boolean) {
    this.isprojectData = true;
    if (isValid) {
      if (this.updateproject) {
        const newObj = {
          projectName: obj.projectName,
          clientName: obj.clientName,
          clientcountry: obj.clientcountry,
          clientrefrence: obj.clientrefrence,
          teamLeader: obj.teamLeader,
          projectType: obj.projectType,
          estimatedHours: obj.projectType === 'Hourly' ? '' : obj.estimatedHours,
          adminComment: obj.adminComment,
          EndDate: obj.EndDate ? formatDate(obj.EndDate, 'MM/dd/yyyy', 'en') : '',
          startDate: formatDate(obj.startDate, 'MM/dd/yyyy', 'en'),
          projectId: this.id
        };
        this.projectService.UpdateProfile(newObj).subscribe((res: any) => {
          console.log(res);

          if (res.ReturnCode === 1) {
            this.toastr.success(res.message);
          } else {
            this.toastr.error(res.message);
          }
        });
      } else {
        const newObj = {
          projectName: obj.projectName,
          clientName: obj.clientName,
          clientcountry: obj.clientcountry,
          clientrefrence: obj.clientrefrence,
          teamLeader: obj.teamLeader,
          estimatedHours: obj.projectType === 'Hourly' ? '' : obj.estimatedHours,
          adminComment: obj.adminComment,
          EndDate: obj.EndDate ? formatDate(obj.EndDate, 'MM/dd/yyyy', 'en') : '',
          projectType: obj.projectType === '',
          startDate: formatDate(obj.startDate, 'MM/dd/yyyy', 'en'),
        };
        this.projectService.addProject(newObj).subscribe((res: any) => {
          console.log(res);

          if (res.ReturnCode === 1) {
            this.toastr.success(res.message);
            this.project.reset();
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      this.isprojectData = false;
    }
  }

}
