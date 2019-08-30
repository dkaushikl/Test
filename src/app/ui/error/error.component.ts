import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() {
    $('.header').hide();
    $('.slider').hide();
  }
  ngOnInit() {

  }
}
