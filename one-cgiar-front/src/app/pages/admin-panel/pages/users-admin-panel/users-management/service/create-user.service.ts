import { EventEmitter, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUserComponent } from '../pages/create-user/create-user.component';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private ref: DynamicDialogRef;
  public $onLoadUserList = new EventEmitter();
   
  constructor(public _dialogService: DialogService) { }

  show() {
    this.ref = this._dialogService.open(CreateUserComponent, {
        header: 'Create new user',
        closable: false,
        width: '30%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 2
    });
  }

  close(){
    if (!this.ref) return;
    this.ref.close();
    this.$onLoadUserList.emit();
  }


}
