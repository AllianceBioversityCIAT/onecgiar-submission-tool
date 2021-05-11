import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { InteractionsService } from '../../../services/interactions.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  hide = true;
  @Output() action = new EventEmitter
  constructor(
    private _authService:AuthService,
    private _interactionsService:InteractionsService
  ) {
    this.changePasswordForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
   }

  ngOnInit(): void {

  }

  onChangePassword(){
    console.log(this.changePasswordForm.value);
    let {email,oldPassword,newPassword}=this.changePasswordForm.value;
    this._authService.changePassword({email,oldPassword,newPassword}).subscribe(resp=>{
      console.log(resp);
      this._interactionsService.successMessage('the password was changed successfully',2000);
      this.action.emit();
    },
    err=>{
      console.log(err);
    }
    )
  }
  changeCard(){
    this.action.emit();
  }
}
