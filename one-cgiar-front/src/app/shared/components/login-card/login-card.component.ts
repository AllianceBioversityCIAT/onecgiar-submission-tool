import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InteractionsService } from '../../services/interactions.service';
import { DataControlService } from '../../services/data-control.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  loginForm: FormGroup;
  subscription: Subscription = new Subscription();
  hide = true;
  constructor(
    private spinnerService: NgxSpinnerService,
    private authSvc: AuthService,
    private router: Router,
    public _interactionsService:InteractionsService,
    public _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
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
        // this.spinnerService.hide("login_spinner");
      },err=>{
        //console.log(err.error?.description);
        //console.log(err);

        if (err.error?.description) {
          if (err.error?.description.indexOf('80090308')>-1) {
            this._interactionsService.errorMessage('The user or password is incorrect.');
          }else{
            this._interactionsService.errorMessage(err.error?.description);
          }
        }
        
        // User password incorrect.
        // Not Found
        //console.log("error");
        this.spinnerService.hide("login_spinner");
      },()=>{this.spinnerService.hide("login_spinner");})
    );
  }

}
