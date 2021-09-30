import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-impact-statements-table',
  templateUrl: './impact-statements-table.component.html',
  styleUrls: ['./impact-statements-table.component.scss']
})
export class ImpactStatementsTableComponent implements OnInit {

  cols: any[];
  impactAreas = [];
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {

    this._initiativesService.getPOBenefitsFp(this._initiativesService.initiative.id).subscribe(respPOB=>{
      console.log(respPOB.response.projectionBenefits);
     
      this._initiativesService.getImpactAreas().subscribe(respImpactAreas=>{
        this.impactAreas = respImpactAreas.response.impactAreasRequested;
        console.log(this.impactAreas);
      })
      
    },err=>{
      console.log(err);
    }, ()=>{

    })


    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'active', header: 'Status' },
    ];
  }

}
