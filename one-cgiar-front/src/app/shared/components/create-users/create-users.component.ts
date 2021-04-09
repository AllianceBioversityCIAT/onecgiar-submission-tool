import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input() allRoles;
  isCgiar = false;
  rolesExample=[1];
  createUserForm: FormGroup;
  constructor(
    public _initiativesSvc: InitiativesService,
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
    this.createUserForm.controls.is_cgiar.setValue(this.isCgiar);
    let body = this.createUserForm.value;
    body.password = this.isCgiar?null:body.password;
    body.roles=[5];
    this._initiativesSvc.createUser(body).subscribe(resp=>{
      console.log(resp);
    });
  }

  validateEmail(){
    if (this.createUserForm.value.email != null) {
      this.isCgiar = this.createUserForm.value.email.indexOf("@cgiar.org")>-1?true:false;
    }
    if (this.isCgiar) {
      this.createUserForm.controls.first_name.setValue("Yecksin");
      this.createUserForm.controls.last_name.setValue("Guerrero")
      // this.createUserForm.controls.password.setValue(null)
      this.createUserForm.controls.password.setValidators([]);
    }else{
      this.createUserForm.controls.password.setValidators([Validators.required]);
    }
  }


}
