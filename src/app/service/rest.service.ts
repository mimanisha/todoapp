import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor( private _http:HttpClient,public _state:StateService) { }

  login(data : any){
    return this._http.post(environment.url +  '/login', data);
  }

  
  getTodos(){
    const headers = new HttpHeaders({'x-access-token':this._state.token});
    return this._http.get( environment.url +  '/todos', {headers});
  }

  change_status(id:number,status:number){
    const headers = new HttpHeaders({'x-access-token':this._state.token});
    return this._http.put(environment.url + '/change_status/' + id, 
    {is_done :status},{headers});
    
  }

  add_todo(task:string){
    const headers = new HttpHeaders({'x-access-token':this._state.token});
    return this._http.post(environment.url + '/add_todo/',
    {task:task},{headers});
  }

  update_todo(id:number,new_task:string){
    const headers = new HttpHeaders({'x-access-token':this._state.token});
    return this._http.put(environment.url + '/update_todo/' + id,
    {task:new_task},{headers});
  }

  delete_todo(id:number){
    const headers = new HttpHeaders({'x-access-token':this._state.token});
    return this._http.delete(environment.url + '/delete_todo/' +id,
    {headers});
  }
}
