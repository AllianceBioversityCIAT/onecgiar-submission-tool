import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaVariablesService } from '../../services/ma-variables.service';

@Component({
  selector: 'app-ma-user-card',
  templateUrl: './ma-user-card.component.html',
  styleUrls: ['./ma-user-card.component.scss']
})
export class MaUserCardComponent implements OnInit {
  @Input() user;
  @Input() roles
  @Output() onSelectOptionEvent = new EventEmitter();
  currentRole = null
  constructor(
    public _maVariablesService:MaVariablesService
  ) { }

  ngOnInit(): void {
    this.findRoleName();
    // this.disableOptions();
  }

  // async disableOptions(){
  //   if (this.user.roleId == 2 || this.user.roleId == 3) {
  //      let roleToDisabled = await this.roles.find(role=>role.id === this.user.roleId);
  //    //  console.log(roleToDisabled)
  //     roleToDisabled.disabled = true;
  //    }
  // }
  removeUser(user){
    user.active = false;
  }

  checkRoleId(){
    if (!this.user.roleId || (this.user.roleId != 2 && this.user.roleId != 3))return;
    return `You can only have one ${ this.roles.find(role=>role.id == this.user.roleId).name} per initiative`
  }

  findRoleName(){
    if (!this.user.roleId)return;
    this.currentRole = this.roles.find(role=>role.id === this.user.roleId)?.name
    // this.user.roleId = this.roles.find(role=>role.id === this.user.roleId).id
  }

  onSelectOption(option){
    this.currentRole = option.name;
    this.user.roleId = option.id;
    this.onSelectOptionEvent.emit();
  }

}
