import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/todoapp/list/list.component';
import { TodoappComponent } from './pages/todoapp/todoapp.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: TodoappComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component:ListComponent },
    { path: '**', redirectTo: 'list' },
  ]  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
