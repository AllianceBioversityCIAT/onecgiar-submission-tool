import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@shared/services/auth.service';
import { Subscription } from 'rxjs';
import { InteractionsService } from '../../shared/services/interactions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  x_position = 0;
  private subscription: Subscription = new Subscription();
  loginForm: FormGroup;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    // public loginForm: BaseFormUser,
    public _interactionsService:InteractionsService,
    private spinnerService: NgxSpinnerService,
  ) { 
    this._interactionsService.showHeader = false;
  }

  ngOnInit(): void {
    // this.loginForm.baseForm.get('role').setValidators(null);
    // this.loginForm.baseForm.get('role').updateValueAndValidity();
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    // console.log("spinner");
    this.spinnerService.show("login_spinner");
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.authSvc.login(this.loginForm.value).subscribe((res) => {
        // console.log("quitar spinner");s
        if (res) {
          this.router.navigate(['/home']);
          this._interactionsService.showHeader = true;
          // console.log('login', res);
       
        }
        this.spinnerService.hide("login_spinner");
      },
      (err)=>{
        console.log(err.error?.description);
        console.log(err);
        if (err.error?.description) {
          this._interactionsService.errorMessage(err.error?.description);
        }
        
        // User password incorrect.
        // Not Found
        console.log("error");
        this.spinnerService.hide("login_spinner");
      },()=>{this.spinnerService.hide("login_spinner");})
    );
  }

  // checkField(field: string): boolean {
  //   return this.loginForm.isValidField(field);
  // }
}
