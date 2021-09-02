import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-fp-work-packages',
  templateUrl: './fp-work-packages.component.html',
  styleUrls: ['./fp-work-packages.component.scss']
})
export class FpWorkPackagesComponent implements OnInit {
  cars: any;
  workPackagesList = [];
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getWpsFpByInititative(this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      // this.workPackagesList = resp.?;
    })
  }
  

}
