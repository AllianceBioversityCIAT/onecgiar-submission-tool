import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../shared/services/initiatives.service';

@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.scss']
})
export class BiComponent implements OnInit {

  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('BI'); 
  }

}
