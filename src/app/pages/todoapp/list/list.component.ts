import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/service/rest.service';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _rest: RestService, public _state: StateService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this._rest.getTodos().subscribe(data => {
      console.log(data);
      this._state.todos = (data as any)['data']; 
    }, err => {
      console.log(err);
    })
  }

  change_status(id: number, status: number) {
    this._rest.change_status(id, status).subscribe(resp => {
      console.log(resp);
      this.getTodos();
    }, err => {
      console.log(err);
      this.getTodos();
    })
  }

  add() {
    const new_task = prompt('new task');
    if (new_task) {
      this._rest.add_todo(new_task).subscribe(resp => {
        console.log(resp);
        this.getTodos();
      }, err => {
        console.log(err);
        this.getTodos();
      });
    }
  }

  edit(id: number, old_task: string) {
    const new_task = prompt('Update task', old_task);
    if (new_task) {
      this._rest.update_todo(id, new_task).subscribe(resp => {
        console.log(resp);
      }, err => {
        console.log(err);
      })
    }
  }

  delete(id: number) {
      if (confirm('Are you sure to delete it ?')) {
        this._rest.delete_todo(id).subscribe(resp => {
          console.log(resp);
          this.getTodos();
        }, err => {
          console.log(err);
          this.getTodos();
        });
      }
    }
  }

