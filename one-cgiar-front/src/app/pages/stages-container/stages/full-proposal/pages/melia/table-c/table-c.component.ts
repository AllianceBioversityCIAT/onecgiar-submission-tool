import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table-c',
  templateUrl: './table-c.component.html',
  styleUrls: ['./table-c.component.scss']
})
export class TableCComponent implements OnInit {
  resultData: ResultData;
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getMeliaResultFramework(this._initiativesService.initiative.id).pipe(map(res=>res.response.melia.resultFramework.tableC.results)).subscribe((resp:ResultData)=>{
      console.log(resp.indicators[0]);
      console.log(resp.result_title)
      this.resultData = resp
    })
  }

}


interface ResultData {
  initvStgId: number;
  id: number;
  result_type_id: number;
  result_title: string;
  is_global: number;
  active: number;
  indicators: Indicator[];
}

interface Indicator {
  id: number;
  name: string;
  unit_measurement: string;
  results_id: number;
  baseline_value: string;
  baseline_year: number;
  target_value: string;
  target_year: number;
  active: number;
  data_source: string;
  data_collection_method: string;
  frequency_data_collection: string;
  created_at: string;
  updated_at: string;
}