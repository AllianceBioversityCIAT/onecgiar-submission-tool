import { Component, OnInit, OnDestroy } from '@angular/core';
import { InteractionsService } from '../../shared/services/interactions.service';
import { DataControlService } from '../../shared/services/data-control.service';
import { environment } from '../../../environments/environment.prod';
import { InitiativesService } from '../../shared/services/initiatives.service';
declare let gtag: (property: string, value: any, configs: any) => {};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService,
    private _initiativesService: InitiativesService
  ) {
    this._interactionsService.showHeader = false;
  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Login');
    try {
      console.log('gtag');
      gtag('config', environment?.googleAnalyticsId, {
        page_path: 'Login',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
