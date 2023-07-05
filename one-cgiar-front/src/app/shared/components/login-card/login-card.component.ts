import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InteractionsService } from '../../services/interactions.service';
import { DataControlService } from '../../services/data-control.service';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  @Input() modeJwtExpired: boolean = false;
  loginForm: FormGroup;
  subscription: Subscription = new Subscription();
  hide = true;
  constructor(
    private spinnerService: NgxSpinnerService,
    private authSvc: AuthService,
    private router: Router,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService,
    public footerSE: FooterService
  ) {}

  ngOnInit(): void {
    // console.log(this.router.routerState.snapshot.url);
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  basicLogin(resp) {
    if (this.modeJwtExpired) return;
    if (resp) {
      this.router.navigate(['/home']);
      this._interactionsService.showHeader = true;
    }
  }

  setModalStatus() {
    this.footerSE.displayContactUs = !this.footerSE.displayContactUs;
    console.log('first');
  }

  jwtExpirationLogin() {
    // console.log(this._dataControlService.currentRequestMethod)
    if (!this.modeJwtExpired) return;
    // console.log("emit");
    this._dataControlService.jwtExpirationSubscription$.emit(false);
    if (!this._dataControlService.currentRequestMethod)
      window.location.reload(); //console.log("reload");
    this._dataControlService.currentRequestMethod = null;
    // window.location.reload();
  }

  onLogin(): void {
    this.spinnerService.show('login_spinner');

    this.subscription.add(
      this.authSvc.login(this.loginForm.value).subscribe(
        (res) => {
          this.basicLogin(res);
          this.jwtExpirationLogin();
        },
        (err) => {
          if (err.error?.description) {
            if (err.error?.description.indexOf('80090308') > -1) {
              this._interactionsService.errorMessage(
                'The user or password is incorrect.'
              );
            } else {
              this._interactionsService.errorMessage(err.error?.description);
            }
          }

          this.spinnerService.hide('login_spinner');
        },
        () => {
          this.spinnerService.hide('login_spinner');
        }
      )
    );
  }

  validateShowBg() {
    return this.modeJwtExpired;
  }
}
