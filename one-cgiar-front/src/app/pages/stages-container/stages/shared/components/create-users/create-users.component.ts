import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input() allRoles;
  @Output() firstTab = new EventEmitter();
  @Output() realoadRoles = new EventEmitter();

  isCgiar = false;
  rolesExample=[1];
  createUserForm: FormGroup;
  constructor(
    public _initiativesSvc: InitiativesService,
    private interactionsService:InteractionsService
  ) { 
    this.createUserForm = new FormGroup({
      first_name: new FormControl({value: null, disabled: this.isCgiar}, Validators.required),
      last_name: new FormControl({value: null, disabled: this.isCgiar}, Validators.required),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      is_cgiar: new FormControl(null),
      email: new FormControl(null, [Validators.required,Validators.email]),
    });
  }

  ngOnInit(): void {
  }


  createUser(){
    this.validateEmail();
    this.createUserForm.controls.is_cgiar.setValue(this.isCgiar);
    let body = this.createUserForm.value;
    body.password = this.isCgiar?null:body.password;
    body.roles=[5];
    body.initiativeId = this._initiativesSvc.initiative.id;
    console.log(body)
    this._initiativesSvc.createUser(body).subscribe(resp=>{
      console.log("******************** Create user ********************");
      this.interactionsService.successMessage(`The user ${(resp.response.user.first_name?resp.response.user.first_name:'') +' '+ (resp.response.user.last_name?resp.response.user.last_name:'')} has been created`);
      this.firstTab.emit();

      this.createUserForm.reset();
    },
    err=>{
      this.interactionsService.errorMessage(err.error.description);
    },
    ()=>{
      this.realoadRoles.emit();
    });
  }

  validateEmail(){

    let passInForm = this.createUserForm.get('password');
    if (this.createUserForm.value.email != null) {
      this.isCgiar = this.createUserForm.value.email.indexOf("@cgiar.org")>-1?true:false;
    }
    if (this.isCgiar) {
      this.createUserForm.controls.password.setValue(null)
      passInForm.clearValidators();
      passInForm.updateValueAndValidity();
    }else{

      this.createUserForm.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
      passInForm.updateValueAndValidity();
    }


    console.log("isCgiar: ",this.isCgiar)


  }

}
