import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../../../../../shared/services/utils.service';
import { ManageExcelService } from '../../../../services/manage-excel.service';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { MessageService } from 'primeng/api';
declare var $;
@Component({
  selector: 'app-pob-resports',
  templateUrl: './pob-resports.component.html',
  styleUrls: ['./pob-resports.component.scss'],
  providers: [MessageService]

})
export class PobResportsComponent implements OnInit {
  notArePreviewinformation = false;
  previewProjectedBenefitsListCoverted = [];
  // previewPOBListMetaData = [];
  mergeList = [];
  headerPreview = [
    {
      headerName : 'Breadth',
      attributeName : 'a'
    },
    {
      headerName : 'Depth',
      attributeName : 'b'
    },
    {
      headerName : 'Probability',
      attributeName : 'c'
    }
  ];
  constructor(
    public _utilsService:UtilsService,
    private _manageExcelService:ManageExcelService,
    private _initiativesService:InitiativesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
 
    this.getPreviewProjectedBenefits();

  }

  rarar = '2';

  getPreviewProjectedBenefits() {
    this._initiativesService.getPreviewProjectedBenefits(this._initiativesService.initiative.id,3).subscribe(resp => {
      console.log(resp.response.previewProjectedBenefits.impactAreas);
      this.objectsTolist(resp.response.previewProjectedBenefits.impactAreas);
    })
  }

  getKeys(customer){
    let result = []
    Object.keys(customer).map(item=>{
      if (item == 'rowspan') return;
      result.push(item)
    })
    return result;
  }


  objectsTolist(previewProjectedBenefits) {
    let i = 0;
    previewProjectedBenefits.map((impactArea) => {

      this.previewProjectedBenefitsListCoverted.push({ a: 'Impact Area: ' + impactArea.impact_area_name });
      i++;
      this.mergeList.push({ s: { r: i, c: 0 }, e: { r: i, c: 2 } })
      this.previewProjectedBenefitsListCoverted.push({ a: 'Impact Area Indicator: ' + impactArea.impactIndicators.impact_area_indicator_name });
      i++;
      this.mergeList.push({ s: { r: i, c: 0 }, e: { r: i, c: 2 } })
      let celIndex = i;
      impactArea?.impactIndicators?.dimensions?.map((dimension,index) => {
        i++;
        if (index == 0) {
          this.previewProjectedBenefitsListCoverted.push({ a: dimension?.breadth_value +' '+ dimension?.targetUnit, b: dimension.depth_description, c: impactArea?.impactIndicators?.probability_name });
        }else{
          this.previewProjectedBenefitsListCoverted.push({ a: dimension?.breadth_value +' '+ dimension?.targetUnit, b: dimension.depth_description });

        }
      })

      if (!impactArea?.impactIndicators?.dimensions.length) {
        i++;
        this.previewProjectedBenefitsListCoverted.push({ a: '', b: '', c: impactArea?.impactIndicators?.probability_name, rowspan:1 });
      }
      // this.previewPOBListMetaData[celIndex] = {rowspan: (i - (celIndex+1)) + 1};
      this.previewProjectedBenefitsListCoverted[celIndex].rowspan = (i + 1) - (celIndex+1) ;
      //console.log(this.previewProjectedBenefitsListCoverted[celIndex]);
      this.mergeList.push({ s: { r: celIndex+1, c: 2 }, e: { r: i, c: 2 } })

    })

    //console.log(this.previewProjectedBenefitsListCoverted);

   
  }

  getTable(){
    
    return document.querySelector("table");
  }

  showBottomCenter() {

    //console.log("ya valió");
    this.messageService.add({key: 'bc', severity:'success', summary: 'Copied table', detail: 'Table information was copied and saved to the clipboard'});
}

  copyTable(){
    //console.log(this.previewProjectedBenefitsListCoverted);
    //console.log(this.previewProjectedBenefitsListCoverted);

    let header='';
    let body = '';
    
    this.headerPreview.map(item=>{
      header+= `<th>${item.headerName}</th>`
    })

    this.previewProjectedBenefitsListCoverted.map(item=>{
      // container+= `<td>${'Example'}</td>`
      let content = '';
      
      
      let keys:any = Object.keys(item)
      
      //console.log(keys);
      keys.map(key=>{
        if (key == 'rowspan') return;
        // [attr.colspan]="getKeys(customer).length <=1?3:1"
        // [attr.rowspan]="(i == 2 && item =='c' && customer.rowspan)?customer.rowspan:1"
        content += `<td ${keys.length <=1?`colspan="3"`:`colspan="1"`} ${(item.rowspan && key =='c')?`rowspan="${item.rowspan}"`:`rowspan="1"`}>${item[key]}</td>`
        //console.log(item[key]);
      })
      body+= `<tr>${content}</tr>`
    })


    let result = 
    `<table>
    <tr>
      ${header}
    </tr>
      ${body}
  </table>`
    return result;
  }
  
  exportExcel() {
    import("xlsx").then(xlsx => {
      let result = [{ a: "Breadth", b: "Depth", c: "Probability" }];




  


      this.previewProjectedBenefitsListCoverted.map(item=>{
        let body:any = {}
 
        Object.keys(item).map(key=>{
          if (key == 'rowspan') return;
          body[key] = item[key]
        })

        result.push(body)
      })

      //console.log(result);

      var worksheet = xlsx.utils.json_to_sheet(result, { header: ["a", "b", "c"], skipHeader: true });

      var wscols = [
        { wpx: 250 },
        { wpx: 250 },
        { wpx: 250 },
      ];

      worksheet['!cols'] = wscols;
      worksheet["!merges"] = this.mergeList;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      xlsx.utils.sheet_add_aoa(workbook, [[123]], { origin: 'A1' });
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this._manageExcelService.saveAsExcelFile(excelBuffer, "partners");
    });
  }


}
