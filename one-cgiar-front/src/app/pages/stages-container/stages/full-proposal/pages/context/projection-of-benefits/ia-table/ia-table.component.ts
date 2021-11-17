import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-ia-table',
  templateUrl: './ia-table.component.html',
  styleUrls: ['./ia-table.component.scss']
})
export class IaTableComponent implements OnInit {
  cols: any[];
  impactAreas = [];
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {

    this._initiativesService.getPOBenefitsFp(this._initiativesService.initiative.id).subscribe(respPOB=>{
      // console.log(respPOB.response.projectionBenefits);
     
      this._initiativesService.getImpactAreas().subscribe(respImpactAreas=>{
        this.impactAreas = respImpactAreas.response.impactAreasRequested;
        // console.log(this.impactAreas);
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
