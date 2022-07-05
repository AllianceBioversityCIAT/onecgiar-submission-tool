import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UsersService } from '../../../../admin/services/users.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import {CreateUserComponent} from './pages/create-user/create-user.component';
import { CreateUserService } from './service/create-user.service';
import { KeyValue } from '@angular/common';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  public userList: Array<UsersInterface>;
  public selectUser: UsersInterface;
  private cloneUser: { [s: number]: UsersInterface } = {};
  ref: DynamicDialogRef;

  constructor(public _usersService: UsersService,
              public _dialogService: DialogService,
              public _createUserService: CreateUserService,
              private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  show() {
    this._createUserService.show();
  }

  getAllUsers(){
    this._usersService.getAll().subscribe(us => {
      this.userList = us['data'].map(el => ({...el, password: ''}));
    })
  }

  clear(table: Table) {
    table.clear();
  }

  onRowEditInit(user: UsersInterface) {
    this.cloneUser[user.id] = {...user};
  }

  onRowEditSave(user: UsersInterface) {
    this.cloneUser[user.id] = {...user, is_active:user.is_active?1:0};
    this.updateUsers({...user, is_active:user.is_active?1:0});
    user.password = '';
  }

  onRowEditCancel(user: UsersInterface, index: number) {
    this.userList[index] = this.cloneUser[user.id];
    delete this.cloneUser[user.id];
  }

  updateUsers(user){
    this._messageService.add({severity:'success', summary:'Updated user successfully ', detail:`User ${user.first_name} ${user.last_name} was successfully updated`});
    this._usersService.update(user).subscribe(res => {
    });
  }

  isCgiar(email){
    return /cgiar.org/.test(email);
  }

}

interface UsersInterface{
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  is_active: number;
  last_login?: Date;
  password?: string;
}
