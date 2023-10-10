import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersManagementComponent } from './users-management.component';

const routes: Routes = [{path:'', component:UsersManagementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
