import { Component, OnInit, OnDestroy } from '@angular/core';
import { InteractionsService } from '../../shared/services/interactions.service';
import { DataControlService } from '../../shared/services/data-control.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    public _interactionsService:InteractionsService,
    public _dataControlService:DataControlService
  ) { 
    this._interactionsService.showHeader = false;
  }

  ngOnInit(): void {
  }

}
