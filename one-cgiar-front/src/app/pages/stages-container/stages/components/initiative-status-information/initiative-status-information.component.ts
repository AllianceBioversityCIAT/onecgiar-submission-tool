import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-initiative-status-information',
  templateUrl: './initiative-status-information.component.html',
  styleUrls: ['./initiative-status-information.component.scss']
})
export class InitiativeStatusInformationComponent implements OnInit {

  constructor( public _initiativesService:InitiativesService) { }

  ngOnInit(): void {
  }

}
