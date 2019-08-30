import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ToastrModule } from 'ng6-toastr-notifications';
import { ToastrModule } from 'ngx-toastr';

import { NumberOnlyDirective } from './directive/number-only.directive';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { ReversePipe } from './pipe/reverse.pipe';

const pipes = [DateFormatPipe, ReversePipe];
const directives = [NumberOnlyDirective];
@NgModule({
  declarations: [NumberOnlyDirective, DateFormatPipe, ReversePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [...pipes, ...directives]
})
export class SharedModule { }
