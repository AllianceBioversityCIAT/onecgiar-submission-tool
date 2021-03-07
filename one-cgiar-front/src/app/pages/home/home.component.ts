import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '@shared/services/auth.service';
import { InitiativesService } from '../../shared/services/initiatives.service';
import { LoggerService } from '@shared/services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isUser: boolean = false;
  public user: any = null;
  public data: any = [];
  public role: string = null;

  constructor( public authSvc: AuthService, public initiativesSvc: InitiativesService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      this.isUser = true;
      this.user = user;
      let roles = this.user.roles.find(role => role.acronym);
      this.role = roles.acronym;
      this.getInitiatives(user);
    })
  }



  getInitiatives(user) {
    this.spinnerService.show();
    if (user.roles?.find(role => role.acronym == 'ADM')) {
      this.initiativesSvc.getAllInitiatives().subscribe(data => {
        this.data = data.data;
        this.spinnerService.hide();
      });
    } else {
      this.initiativesSvc.getInitiativesByUser().subscribe(data => {
        this.data = data.data;
        this.spinnerService.hide();
      });
    }
  }
  

}