import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { map } from 'rxjs/operators';
import { ManageExcelService } from '../../../services/manage-excel.service';
import { UtilsService } from '../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-table-c',
  templateUrl: './table-c.component.html',
  styleUrls: ['./table-c.component.scss']
})
export class TableCComponent implements OnInit {
  // resultDataList: ResultData[];
  resultDataList: any[] = [];
  listToSave : any[] = [];
  // htmlText = ' <p>The following information is in read mode . Please refer to the <a target="_blank" href="https://toc.mel.cgiar.org">theory of change platform</a> and the <a target="_blank" href="https://docs.google.com/document/d/1s6SVqaFhbme2l-iAyvuOPggY9sjhBeYl/edit">MELIA Guidance</a> to edit it.</p>'
  constructor( 
    private _initiativesService:InitiativesService,
    private _manageExcelService:ManageExcelService,
    public _utilsService:UtilsService
    ) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('Table C');
    this._initiativesService.getMeliaResultFramework().pipe(map(res=>res.response.melia.resultFramework.tableC.results)).subscribe((resp:ResultData[])=>{
      // this.resultDataList = resp;
      // console.log(this.resultDataList);
      this.convertDataToUseInTable(resp);
      this.listToSave = resp;
      console.log(resp)
    })
  }

  toggleExpandTable(boxTable:HTMLElement){
    boxTable.classList.toggle('boxExpanded')
  }

  convertDataToUseInTable(resp:ResultData[]){
    // console.log(resp)
    resp.map(result=>{
      // console.log(result)

      if (!result?.indicators?.length) return this.resultDataList.push(
        {
          result_title: result?.result_title,
          type_name: result?.type_name,
          wp_acronym: result?.wp_acronym, 
          rowSpan: 1, 
          geo_scope: this.compactGeoData(result['geo_scope'])
        }) ;

      result?.indicators.map((indicator,index)=>{
        
        if (index == 0) {
          this.resultDataList.push(
            {
              result_title: result?.result_title,
              type_name: result?.type_name, 
              wp_acronym: result?.wp_acronym, 
              rowSpan: result?.indicators?.length, 
              geo_scope: this.compactGeoData(result['geo_scope']),
              ...indicator
            });
        }else{
          this.resultDataList.push({...indicator});
        }

      })
    })

    console.log(this.resultDataList)
  }

  compactGeoData(geo_scope){
    let textResult:string = '';
    let {countries,regions} = geo_scope;

    if (regions?.length) {
      textResult+= '<strong>Regions: </strong>'
    }
    regions?.map((item,index)=>{
      textResult+= `${item?.region_name}${index+1 == regions.length ? '' : ', '} `
    })

    if (regions?.length) {
      textResult+= '<br><br><strong>Countries: </strong>'
    }
    countries?.map((item,index)=>{
      textResult+= `${item?.country_name}${index+1 == countries.length ? '' : ', '}`
    })

    // console.log(geo_scope)
    return textResult;
    
  }

  compactGeoDataToExport(geo_scope){
    let textResult:string = '';
    let {countries,regions} = geo_scope;
    if (regions?.length) {
      textResult+= 'Regions: ('
    }
    regions?.map((item,index)=>{
      textResult+= `${item?.region_name}${index+1 == regions.length ? '' : ', '} `
    })

    if (regions?.length) {
      textResult+= ') - Countries: ('
    }
    countries?.map((item,index)=>{
      textResult+= `${item?.country_name}${index+1 == countries.length ? '' : ', '}`
    })
    if ( countries?.length) { textResult+= ')';} 
    console.log(geo_scope)
    return textResult;
    
  }

  exportBasicExcel(){
    let list = [];
    this.listToSave.map(result=>{
      result.indicators.map((indicator)=>{
          list.push({
            Result_type	: result?.type_name || 'Not provided',
            Work_package:  result?.wp_acronym || 'Not provided',
            result_title: result?.result_title || 'Not provided',
            geo_scope: this.compactGeoDataToExport(result['geo_scope']) || 'Not provided',
            indicator_name: indicator?.indicator_name || 'Not provided',
            unit_measurement: indicator?.unit_measurement || 'Not provided',
            data_source: indicator?.data_source || 'Not provided',
            data_collection_method: indicator?.data_collection || 'Not provided',
            frequency_data_collection: indicator?.frequency_data_collection || 'Not provided',
            baseline_value: indicator?.baseline_value || 'Not provided',
            baseline_year: indicator?.target_value || 'Not provided',
            target_year: indicator?.target_year || 'Not provided'
            });
      })
    })
    this._manageExcelService.exportBasicExcel( list,'resultDataList',[{wpx:90},{wpx:100},{wpx:500},{wpx:100},{wpx:200},{wpx:200}])
  }

}


interface ResultData {
  initvStgId: number;
  id: number;
  result_type_id: number;
  result_title: string;
  wp_name:string;
  wp_acronym:string;
  is_global: number;
  active: number;
  type_name: string;
  indicators: Indicator[];
}

interface Indicator {
  id: number;
  indicator_name: string;
  unit_measurement: string;
  results_id: number;
  baseline_value: string;
  baseline_year: number;
  target_value: string;
  target_year: number;
  active: number;
  data_source: string;
  data_collection: string;
  frequency_data_collection: string;
  created_at: string;
  updated_at: string;
}