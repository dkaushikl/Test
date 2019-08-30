import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blueSoft';
  islogin = false;
  constructor(private location: Location, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      if (this.location.path() === '/login') {
        this.router.navigate(['/page/home']);
      }
    }
  }
}

