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
  constructor(public _initiativesService: InitiativesService) {}

  ngOnInit(): void {
    console.log(this._initiativesService.initiative.stageName);
    this._initiativesService.getWpsFpByInititative().subscribe(
      resp => {
        this.workPackagesList = resp.response.workpackage;
      },
      err => {
        console.log(err);
      }
    );

    this.cols = [
      { field: 'acronym', header: 'Short name' }
      // { field: 'active', header: 'General information status' },
      // { field: 'active', header: 'Theory of change status' }
    ];
  }
}
