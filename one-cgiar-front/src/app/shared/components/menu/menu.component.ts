import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  panelOpenPC = false;
  panelOpenC = false;
  panelOpenWP = false;
  panelOpenFP = false;

  constructor(public _auth: AuthService, public _requests: RequestsService, public activatedRoute: ActivatedRoute, public initiativesSvc: InitiativesService) { }

  ngOnInit(): void { }

}
