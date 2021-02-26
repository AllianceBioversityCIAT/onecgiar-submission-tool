import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { UsersService } from '@app/shared/services/users.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {

  public createUserForm: FormGroup;
  private user = JSON.parse(localStorage.getItem('user')) || null;
  public roles: any[] = [];
  isCgiar: boolean;

  constructor(public initiativesSvc: InitiativesService, public usersSvc: UsersService, private router: Router) {
    this.createUserForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      is_cgiar: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.isCgiar = this.createUserForm.get('is_cgiar').value;
    this.usersSvc.getRoles().subscribe(resp => this.roles = resp.data);
  }

  onSubmit() {
    // this.usersSvc.getRolesById(this.createUserForm.value.roles).subscribe(resp => {console.log('getRolesById', resp)});

    // this.usersSvc.getRolesById(this.createUserForm.value.roles).subscribe(resp => {
    //   console.log('getRolesById', resp);
    //   this.usersSvc.createUsers(this.createUserForm.value, resp).subscribe(resp => {
    //     console.log('createUsers', resp);
    //   })
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'General information has been saved',
    //     showConfirmButton: false,
    //     timer: 2000
    //   })
    // })
  }

}