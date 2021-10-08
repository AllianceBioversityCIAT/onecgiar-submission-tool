import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-fp-work-packages',
  templateUrl: './fp-work-packages.component.html',
  styleUrls: ['./fp-work-packages.component.scss']
})
export class FpWorkPackagesComponent implements OnInit {
  constructor( public _dataControlService:DataControlService) { }

  ngOnInit(): void {

  }
  

}
