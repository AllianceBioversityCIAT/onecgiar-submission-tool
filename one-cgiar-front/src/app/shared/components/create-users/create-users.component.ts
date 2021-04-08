import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input() allRoles;
  rolesExample=[1];
   createUserForm: FormGroup;
  constructor() { 
    this.createUserForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      is_cgiar: new FormControl(null),
      email: new FormControl(null, [Validators.required,Validators.email]),
    });
  }

  ngOnInit(): void {
  }


  createUser(){
    console.log(this.createUserForm.value);
  }

  validateUser(){
    console.log("validate users");
  }

}
