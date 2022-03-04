import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-table-b',
  templateUrl: './table-b.component.html',
  styleUrls: ['./table-b.component.scss']
})
export class TableBComponent implements OnInit {
  tableBData:TableBData
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getMeliaResultFramework(this._initiativesService.initiative.id).pipe(map(res=>res.response.melia.resultFramework.tableB)).subscribe((resp:TableBData)=>{
      this.tableBData = resp;
      console.log(this.tableBData)
    })
  }

}

interface TableBData {
  actionAreasOutcomesIndicators: ActionAreasOutcomesIndicator[];
}

interface ActionAreasOutcomesIndicator {
  initvStgId: number;
  id: number;
  outcomes_indicators_id: number;
  outcome_id: number;
  outcome_statement: string;
  outcome_indicator_id: number;
  outcome_indicator_smo_code: string;
  outcome_indicator_statement: string;
}