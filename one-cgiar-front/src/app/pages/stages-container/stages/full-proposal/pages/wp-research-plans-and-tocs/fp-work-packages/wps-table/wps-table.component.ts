import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-wps-table',
  templateUrl: './wps-table.component.html',
  styleUrls: ['./wps-table.component.scss']
})
export class WpsTableComponent implements OnInit {

  cols: any[];
  workPackagesList = [];
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getWpsFpByInititative(this._initiativesService.initiative.id, this._initiativesService.initiative.stageNameToServices).subscribe(resp=>{
      this.workPackagesList = resp.response.workpackage;
    })
    

    this.cols = [
        { field: 'acronym', header: 'Short name' },
        // { field: 'active', header: 'General information status' },
        // { field: 'active', header: 'Theory of change status' }
    ];
  }

}
