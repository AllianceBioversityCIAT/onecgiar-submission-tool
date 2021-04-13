import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input() allRoles;
  @Output() firstTab = new EventEmitter();
  showInitial = false;
  isCgiar = false;
  rolesExample=[1];
  checkedCgiar=false;
  createUserForm: FormGroup;
  constructor(
    public _initiativesSvc: InitiativesService,
    private interactionsService:InteractionsService
  ) { 
    this.createUserForm = new FormGroup({
      first_name: new FormControl({value: null, disabled: this.isCgiar}, Validators.required),
      last_name: new FormControl({value: null, disabled: this.isCgiar}, Validators.required),
      password: new FormControl(null,[Validators.required]),
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
    this._initiativesSvc.createUser(body).subscribe(resp=>{
      console.log('%cusers','background: #222; color: #84c3fd');
      console.log(resp);
      this.interactionsService.successMessage(`The user ${(resp.response.user.first_name?resp.response.user.first_name:'') +' '+ (resp.response.user.last_name?resp.response.user.last_name:'')} has been created`);
      this.firstTab.emit();
    },
    err=>{
      console.log(err);
      console.log(err.error.msg);
      this.interactionsService.errorMessage(err.error.msg);
    });
  }

  validateEmail(){
    this.showInitial = true;
    this.checkedCgiar = true;
    let passInForm = this.createUserForm.get('password');
    if (this.createUserForm.value.email != null) {
      this.isCgiar = this.createUserForm.value.email.indexOf("@cgiar.org")>-1?true:false;
    }
    if (this.isCgiar) {
      this.createUserForm.controls.first_name.setValue("cgiarfirstname");
      this.createUserForm.controls.last_name.setValue("cgiarlastname")
      passInForm.clearValidators();
      passInForm.updateValueAndValidity();
    }else{
      this.createUserForm.controls.password.setValidators([Validators.required]);
      passInForm.updateValueAndValidity();
    }
  }

  cleanCheckedCgiar(){
    console.log("on change");
    this.checkedCgiar = false;
  }


}
