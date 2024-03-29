import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { map } from 'rxjs/operators';
import { ManageExcelService } from '../../../services/manage-excel.service';
import { UtilsService } from '../../../../../../../shared/services/utils.service';
import { PusherService } from '../../../../../../../shared/services/pusher.service';

@Component({
  selector: 'app-table-c',
  templateUrl: './table-c.component.html',
  styleUrls: ['./table-c.component.scss']
})
export class TableCComponent implements OnInit {
  // resultDataList: ResultData[];
  resultDataList: any[] = [];
  listToSave : any[] = [];
  lastUpdate: string;
  // htmlText = ' <p>The following information is in read mode . Please refer to the <a target="_blank" href="https://toc.mel.cgiar.org">theory of change platform</a> and the <a target="_blank" href="https://docs.google.com/document/d/1s6SVqaFhbme2l-iAyvuOPggY9sjhBeYl/edit">MELIA Guidance</a> to edit it.</p>'
  constructor( 
    private _initiativesService:InitiativesService,
    private _manageExcelService:ManageExcelService,
    public _utilsService:UtilsService,
    private _pusherService:PusherService
    ) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('Table C');
    this.getMeliaResultFramework();
    this._initiativesService.getInitvStgId().subscribe(resp => {
      this._initiativesService.initvStgId = resp.response;
      this._pusherService.listenTocChange('table-c',()=>{
        this.getMeliaResultFramework();
      });
    })
  }

  getMeliaResultFramework(){
    this._initiativesService.getMeliaResultFramework().pipe(map(res=>res.response.melia.resultFramework.tableC)).subscribe((resp:{results:ResultData[],updated_at:{updated_at:string}[]})=>{
      // this.resultDataList = resp;
      // console.log(this.resultDataList);
      this.convertDataToUseInTable(resp.results);
      this.listToSave = resp.results;
      this.lastUpdate = resp?.updated_at[0].updated_at;
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
          wp_name: result?.wp_name,
          rowSpan: 1, 
          is_global: result?.is_global,
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
              wp_name: result?.wp_name,
              is_global: result?.is_global,
              geo_scope: this.compactGeoData(result['geo_scope']),
              ...indicator
            });
        }else{
          this.resultDataList.push({...indicator});
        }

      })
    })

    // console.log(this.resultDataList)
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
    console.log(this.listToSave);
      
    this.listToSave.map(result=>{
    
        if (result.indicators.length > 0) {
          result.indicators.map((indicator)=>{
            list.push({
              Result_type	: result?.type_name || 'Not provided',
               Work_package: `${result?.wp_acronym && result?.wp_name ? '' : 'Not provided'}${result?.wp_acronym || ''}${result?.wp_acronym ? ': ' : ''} ${result?.wp_name || ''}`,
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
        } else {
          list.push({
            Result_type	: result?.type_name || 'Not provided',
            Work_package: `${result?.wp_acronym && result?.wp_name ? '' : 'Not provided'}${result?.wp_acronym || ''}${result?.wp_acronym ? ': ' : ''} ${result?.wp_name || ''}`,
            result_title: result?.result_title || 'Not provided',
            geo_scope: this.compactGeoDataToExport(result['geo_scope']) || 'Not provided',
            })
          
        }
   
    })

    this._manageExcelService.exportBasicExcel( list,'resultDataList',[{wpx:90},{wpx:300},{wpx:500},{wpx:100},{wpx:200},{wpx:200}])
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