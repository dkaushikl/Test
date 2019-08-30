import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  public option = 1;
  constructor() { }

  ngOnInit() {
    $('.header').show();
    $('.slider').show();
  }

  callComponet(obj: any) {
    this.option = obj;
  }

}
