import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  hide = true;
  @Output() action = new EventEmitter
  constructor() {
    this.changePasswordForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      currentPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
   }

  ngOnInit(): void {

  }

  onChangePassword(){

  }
  changeCard(){
    this.action.emit();
  }
}
