import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { UtilsService } from '../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-table-b',
  templateUrl: './table-b.component.html',
  styleUrls: ['./table-b.component.scss']
})
export class TableBComponent implements OnInit {
  tableBData:TableBData;
  // htmlText = ' <p>The following information is in read mode . Please refer to the <a target="_blank" href="https://toc.mel.cgiar.org">theory of change platform</a> and the <a target="_blank" href="https://docs.google.com/document/d/1s6SVqaFhbme2l-iAyvuOPggY9sjhBeYl/edit">MELIA Guidance</a> to edit it.</p>'
  constructor( 
    private _initiativesService:InitiativesService,
    public _utilsService:UtilsService

    ) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('Table B')
    this._initiativesService.getMeliaResultFramework().pipe(map(res=>res.response.melia.resultFramework.tableB)).subscribe((resp:TableBData)=>{
      this.tableBData = resp;
    })
  }

}

interface TableBData {
  action_areas_outcomes_indicators: ActionAreasOutcomesIndicator[];
  update_at: Array<{updated_at:string, initvStgId:number}>;
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