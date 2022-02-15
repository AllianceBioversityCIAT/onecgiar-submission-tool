import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataControlService } from '../../services/data-control.service';

@Component({
  selector: 'app-jwt-expiration-subscription',
  templateUrl: './jwt-expiration-subscription.component.html',
  styleUrls: ['./jwt-expiration-subscription.component.scss']
})
export class JwtExpirationSubscriptionComponent implements OnInit {
  showLogin$: Subscription;
  showLoginCard:boolean = false;
  constructor(
    private _dataControlService:DataControlService
  ) { }

  ngOnInit(): void {
    //? login suscription
    this.showLogin$ = this._dataControlService.jwtExpirationSubscription$.subscribe(resp => {
      this.showLoginCard = resp;      
    })


  }

}
