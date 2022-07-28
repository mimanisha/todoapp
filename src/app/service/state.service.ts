import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  token="";
  user = {full_name: ''};
  todos = [];

  constructor(private _router:Router) { }

  decodeToken(){
    this.user = jwt_decode(this.token);
    console.log(this.user);
}

checkToken() {
  const token = localStorage.getItem('token');
  if (token) {
    this.token = token;
    this.decodeToken();
  } else {
    this._router.navigate(['/login']);
  }
}

logout(){
  localStorage.removeItem('token');
  this._router.navigate(['/login']);
}

}
