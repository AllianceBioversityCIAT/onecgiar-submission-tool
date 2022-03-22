import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-pc-wp-table',
  templateUrl: './pc-wp-table.component.html',
  styleUrls: ['./pc-wp-table.component.scss']
})
export class PcWpTableComponent implements OnInit {

  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {

    console.log(this._initiativesService.initiative.stageNameToServices)
  }

}
