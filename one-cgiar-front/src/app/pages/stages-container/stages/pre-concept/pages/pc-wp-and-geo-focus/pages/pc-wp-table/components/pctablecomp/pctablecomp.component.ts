import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-pctablecomp',
  templateUrl: './pctablecomp.component.html',
  styleUrls: ['./pctablecomp.component.scss']
})
export class PctablecompComponent implements OnInit {

  cols: any[];
  workPackagesList = [];
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getWpsFpByInititative(this._initiativesService.initiative.id, this._initiativesService.initiative.stageName).subscribe(resp=>{
      console.log(resp.response.workpackage);
      this.workPackagesList = resp.response.workpackage;
    })
    

    this.cols = [
        { field: 'acronym', header: 'Short name' },
        // { field: 'active', header: 'General information status' },
        // { field: 'active', header: 'Theory of change status' }
    ];
  }

}
