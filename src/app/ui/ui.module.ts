import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from '../core/guards';
import { ForgetpasswordLinkComponent } from './forgetpassword-link/forgetpassword-link.component';
import { ErrorComponent } from './error/error.component';
import { SelectModule } from 'ng-select';
import { ForumsComponent } from './forums/forums.component';
import { CompanyPoliciesComponent } from './forums/company-policies/company-policies.component';
import { CompanySchemesComponent } from './forums/company-schemes/company-schemes.component';
import { WebDesignerCommunityComponent } from './forums/web-designer-community/web-designer-community.component';
import { DeveloperCommunityComponent } from './forums/developer-community/developer-community.component';
import { CodingStandardsComponent } from './forums/coding-standards/coding-standards.component';
import { EnglishComponent } from './forums/english/english.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'forgetPassword', component: ResetPasswordComponent },
  { path: 'forgetpassword/link/:id', component: ForgetpasswordLinkComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'forums', component: ForumsComponent },
  { path: 'child-one', component: CompanyPoliciesComponent },
  { path: 'child-two', component: CompanySchemesComponent }
];

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LoginComponent, ProfileComponent,
    ChangePasswordComponent, ResetPasswordComponent, ForgetpasswordLinkComponent, ErrorComponent, ForumsComponent, CompanyPoliciesComponent, CompanySchemesComponent, WebDesignerCommunityComponent, DeveloperCommunityComponent, CodingStandardsComponent, EnglishComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    BsDatepickerModule,
    SelectModule,
    RouterModule.forChild(routes)
  ],
  exports: [HeaderComponent, SidebarComponent, RouterModule]
})
export class UiModule { }
