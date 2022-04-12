import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table-c',
  templateUrl: './table-c.component.html',
  styleUrls: ['./table-c.component.scss']
})
export class TableCComponent implements OnInit {
  // resultDataList: ResultData[];
  resultDataList: any[] = [];

  htmlText = ' <p>The following information is in read mode . Please refer to the <a target="_blank" href="https://toc.mel.cgiar.org">theory of change platform</a> and the <a target="_blank" href="https://docs.google.com/document/d/1s6SVqaFhbme2l-iAyvuOPggY9sjhBeYl/edit">MELIA Guidance</a> to edit it.</p>'
  constructor( private _initiativesService:InitiativesService) { }

  ngOnInit(): void {
    this._initiativesService.getMeliaResultFramework(this._initiativesService.initiative.id).pipe(map(res=>res.response.melia.resultFramework.tableC.results)).subscribe((resp:ResultData[])=>{
      // this.resultDataList = resp;
      // console.log(this.resultDataList);
      this.convertDataToUseInTable(resp);
    })
  }

  convertDataToUseInTable(resp:ResultData[]){
    console.log(resp)
    resp.map(result=>{
      result.indicators.map((indicator,index)=>{
        console.log(index);
        console.log(result.indicators.length+" "+(index+1))
        if (index == 0) {
          this.resultDataList.push({result_title: result?.result_title,type_name: result?.type_name, rowSpan: result?.indicators?.length , ...indicator});
        }else{
          this.resultDataList.push({...indicator});
        }

      })
    })

    console.log(this.resultDataList)


  }

}


interface ResultData {
  initvStgId: number;
  id: number;
  result_type_id: number;
  result_title: string;
  is_global: number;
  active: number;
  type_name: string;
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