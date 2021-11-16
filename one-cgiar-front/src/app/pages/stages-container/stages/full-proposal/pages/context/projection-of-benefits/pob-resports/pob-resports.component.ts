import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../../../../../shared/services/utils.service';
import { ManageExcelService } from '../../../../services/manage-excel.service';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
declare var $;
@Component({
  selector: 'app-pob-resports',
  templateUrl: './pob-resports.component.html',
  styleUrls: ['./pob-resports.component.scss']
})
export class PobResportsComponent implements OnInit {
  notArePreviewinformation = false;
  previewProjectedBenefitsListCoverted = [];
  previewPOBListMetaData = [];
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
    private _initiativesService:InitiativesService
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
    // console.log(Object.keys(customer));
    return Object.keys(customer);
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
          this.previewProjectedBenefitsListCoverted.push({ a: dimension.breadth_value, b: dimension.depth_description, c: impactArea?.impactIndicators?.probability_name });
        }else{
          this.previewProjectedBenefitsListCoverted.push({ a: dimension.breadth_value, b: dimension.depth_description, c: '' });

        }
      })

      if (!impactArea?.impactIndicators?.dimensions.length) {
        i++;
        this.previewProjectedBenefitsListCoverted.push({ a: '', b: '', c: impactArea?.impactIndicators?.probability_name });
      }
      this.previewPOBListMetaData[celIndex] = {rowspan: (i - (celIndex+1)) + 1};
      this.mergeList.push({ s: { r: celIndex+1, c: 2 }, e: { r: i, c: 2 } })

    })

   
  }

  getTable(){
    
    return document.querySelector("table");
  }
  
  exportExcel() {
    import("xlsx").then(xlsx => {
      let result = [{ a: "Breadth", b: "Depth", c: "Probability" }];

      this.previewProjectedBenefitsListCoverted.map(item=>{
        result.push(item)
      })
      // example.map((impactArea) => {
      //   index++;
      //   result.push({ a: impactArea.impactAreaTitle, b: '', c: '' })
      //   merge.push({ s: { r: index, c: 0 }, e: { r: index, c: 2 } })

      //   impactArea.indicators.map((indicator) => {

      //     index++;
      //     result.push({ a: indicator.impactIndicatorTitle, b: '', c: '' })
      //     merge.push({ s: { r: index, c: 0 }, e: { r: index, c: 2 } })
      //     indicator.dimensions.map((dimension) => {
      //       result.push({ a: dimension.breadth, b: dimension.depth, c: dimension.probability })
      //     })

      //   })

      // })

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
