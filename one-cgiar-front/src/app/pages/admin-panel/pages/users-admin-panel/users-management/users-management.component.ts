import { Component, EventEmitter, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UsersService } from '../../../../admin/services/users.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { CreateUserService } from './service/create-user.service';
import {MessageService} from 'primeng/api';
import { Subscription } from 'rxjs';
import { ManageExcelService } from '../../../../stages-container/stages/full-proposal/services/manage-excel.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  public userList: Array<UsersInterface>;
  public selectUser: UsersInterface;
  private cloneUser: { [s: number]: UsersInterface } = {};
  loading: boolean = true;
  ref: DynamicDialogRef;
  localOnCloseModal: Subscription;

  constructor(public _usersService: UsersService,
              public _dialogService: DialogService,
              public _createUserService: CreateUserService,
              private _messageService: MessageService,
              private _manageExcelService:ManageExcelService,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.localOnCloseModal = this._createUserService.$onLoadUserList.subscribe(e => {
      this.getAllUsers();
    });
  }

  show() {
    this._createUserService.show();
  }

  getAllUsers(){
    this._usersService.getAll().subscribe(us => {
      this.userList = us['data'].map(el => ({...el, password: ''}));
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.localOnCloseModal.unsubscribe();
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

  exportExcel() {
    import("xlsx").then(xlsx => {
      const dateStamp = new Date();
      const xlsExport = this.userList.map(e=>({id:e.id,
                                                    first_name:e.first_name,
                                                    last_name:e.last_name,
                                                    email:e.email,
                                                    active:e.is_active,
                                                    last_login:e.last_login
                                                  }));
      const worksheet = xlsx.utils.json_to_sheet(xlsExport);
      var wscols = [
        {wpx:50},
        {wpx:50},
        {wpx:50},
        {wpx:80},
        {wpx:50},
        {wpx:50}
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this._manageExcelService.saveAsExcelFile(excelBuffer, `Users Management_${this.datepipe.transform(dateStamp,'yyyyLLdd_HHmmSS')}`);
    });
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
