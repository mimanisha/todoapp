import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/service/rest.service';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-todoapp',
  templateUrl: './todoapp.component.html',
  styleUrls: ['./todoapp.component.css']
})
export class TodoappComponent implements OnInit {

  constructor(public _state:StateService,private _router:Router, private _rest:RestService) { }

  ngOnInit(): void {
    this._state.checkToken();
  }

  
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this._state.logout();
    }
  }

}
