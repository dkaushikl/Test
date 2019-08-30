import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SupportTicketService } from 'src/app/core/service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-supportticket',
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {
  public p;
  isTicket = false;
  isTicketsDetail = false;
  supportTicket: FormGroup;
  replay: FormGroup;
  isSupportTicket = false;
  isreplay = false;
  public supportTicketData;
  public supportTicketImage;
  public TicketNo;
  imageEnvironment = environment.imgurl;
  chatIsToggled;
  isAdmin = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService, public supportticketservice: SupportTicketService) {
    this.supportTicket = this.fb.group({
      subject: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
    });
    this.replay = this.fb.group({
      replayMessage: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
    this.getSupportTicketData();
  }

  ticketStatus() {
    this.isTicket = !this.isTicket;
  }

  change() {
  }

  changeTicketStatus() {
    this.isTicket = false;
    this.isSupportTicket = false;
  }

  ticketsDetailStatus(obj) {
    this.chatIsToggled = document.getElementsByClassName('show' + obj);
    if (this.chatIsToggled[0].style.display === 'block') {
      this.chatIsToggled[0].style.display = 'none';
    } else {
      this.chatIsToggled[0].style.display = 'block';
    }
  }

  ticketsDetailStatustrue(obj) {
    this.chatIsToggled = document.getElementsByClassName('show' + obj);
    this.chatIsToggled[0].style.display = 'block';
  }

  getSupportTicketData() {
    this.supportticketservice.getsupportticketData().subscribe((res: any) => {
      this.isAdmin = res.Role === 'Admin' ? true : false;
      this.supportTicketData = res.Data.reverse();
      this.supportTicketImage = res;
    });
  }

  submit(obj: any, isValid: boolean) {
    this.isSupportTicket = true;
    if (isValid) {
      const newObj = {
        detail: obj.detail,
        department: obj.department,
        subject: obj.subject,
      };
      this.supportticketservice.addsupportTicket(newObj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.supportTicket.reset();
          this.changeTicketStatus();
          this.getSupportTicketData();
        } else {
          this.toastr.error(res.message);
        }
      });
      this.isSupportTicket = false;
    }
  }

  newMessage(obj: any, isValid: boolean, ticketId: any, index: any) {
    this.isreplay = true;
    if (isValid) {
      const newObj = {
        TicketId: ticketId,
        message: obj.replayMessage,
      };
      this.supportticketservice.addReply(newObj).subscribe((res: any) => {
        if (res.ReturnCode === 1) {
          this.toastr.success(res.message);
          this.replay.reset();
          this.getSupportTicketData();
          setTimeout(() => {
            this.ticketsDetailStatustrue(index);
          }, 8);

        } else {
          this.toastr.error(res.message);
        }
      });
      this.isreplay = false;
    }
  }

  deleteticket(obj: any) {
    const newObj = {
      ticketId: obj
    };
    this.supportticketservice.deleteticket(newObj).subscribe((res: any) => {
      if (res.ReturnCode === 1) {
        this.toastr.success(res.message);
        this.getSupportTicketData();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

}
