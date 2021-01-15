import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
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

  constructor(public _auth: AuthService, public _requests: RequestsService) { }

  ngOnInit(): void {
  }

}
