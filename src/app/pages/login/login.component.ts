import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/service/rest.service';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;

  constructor(private _rest:RestService,public _state:StateService, private _router:Router) { 
    this.loginform = new FormGroup({
      "username": new FormControl(''),
    "password" : new FormControl('')});
  }

  ngOnInit(): void {
  }

  checktoken(){
    const token = localStorage.getItem('token');
    if (token) {
      this._state.token = token;
      this._state.decodeToken();
      this._router.navigate(['/home']);
    } 
  }


  login(){
    this._rest.login(this.loginform.value).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', (data as any).data);
        this._state.token = (data as any).data;
        this._state.decodeToken();
        alert((data as any)['message']);
        this._router.navigate(['/home']);
      }, err => {
        alert(err.error.message);
        console.log(err);
      }
    );
  }


}
