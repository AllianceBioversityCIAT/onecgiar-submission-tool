import { Component, OnInit } from '@angular/core';
import { CreateUserService } from '../../service/create-user.service';
import { UsersService } from '../../../../../../admin/services/users.service';
import { UsersInterface } from '../../interfaces/UserInterface';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public newUser: UsersInterface = {
    email:'',
    first_name: '',
    last_name: '',
    is_active: 1,
    password:'',
    roles: [],
    is_cgiar: false
  };
  public roles: Array<any> = [];

  constructor(public _createUserService: CreateUserService,
              public _usersService: UsersService,
              private _interactionsService:InteractionsService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  close(){
    this._createUserService.close();
  }

  isCgiar(){
    this.newUser.is_cgiar = /cgiar.org/.test(this.newUser.email);
  }

  validData(){
    let valid = true;
    valid = this.newUser.first_name?valid:false
    valid = this.newUser.last_name?valid:false
    valid = this.newUser.email?valid:false
    valid = this.newUser.password.length >= 8?valid:this.newUser.is_cgiar;
    return valid;
  }

  createUser(){
    if(!this.validData()){
      this._interactionsService.warningMessage('Mandatory fields are incomplete');
      return;
    }
    this._usersService.new(this.newUser).subscribe(e => {
      this._interactionsService.successMessage(`The user ${e['response']['user']['first_name']} ${e['response']['user']['last_name']} has been created`);
      this.newUser = {
        email:'',
        first_name: '',
        last_name: '',
        is_active: 1,
        password:'',
        roles: [4],
        is_cgiar: false
      };
    });
  }

  getRoles(){
    this._usersService.getRoles().subscribe(e => {
      this.roles = e.data.filter(el => el.id == 1 || el.id == 4).map(el => ({code:el.id, name:el.name}));
      this.newUser.roles[0] = 4;
    });
  }

}
