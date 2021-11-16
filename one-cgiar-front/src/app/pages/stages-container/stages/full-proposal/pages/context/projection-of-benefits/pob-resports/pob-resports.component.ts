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

    console.log('Impact Area:'.search('Impact Area Indicator'));
    console.log('Impact Area Indicator:'.search('Impact Area Indicator'));
    
    this.getPreviewProjectedBenefits();

  }

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


  objectsTolist(previewProjectedBenefits){
    previewProjectedBenefits.map((impactArea) => {
      console.log(impactArea);
    //   index++;
    //   result.push({ a: impactArea.impactAreaTitle, b: '', c: '' })

    this.previewProjectedBenefitsListCoverted.push({a:'Impact Area: '+impactArea.impact_area_name})
    this.previewProjectedBenefitsListCoverted.push({a:'Impact Area Indicator: '+impactArea.impactIndicators.impact_area_indicator_name})

    impactArea?.impactIndicators?.dimensions?.map(dimension=>{
      this.previewProjectedBenefitsListCoverted.push({a:dimension.breadth_value,b:dimension.depth_description,c:''})
    })
    //   merge.push({ s: { r: index, c: 0 }, e: { r: index, c: 2 } })

 
        // this.previewProjectedBenefitsListCoverted.push({a:indicator.impact_area_indicator_name})

      //     index++;
      //     result.push({ a: indicator.impactIndicatorTitle, b: '', c: '' })
      //     merge.push({ s: { r: index, c: 0 }, e: { r: index, c: 2 } })
      //     indicator.dimensions.map((dimension) => {
      //       result.push({ a: dimension.breadth, b: dimension.depth, c: dimension.probability })
      //     })

    

    })
    console.log("________________________________-______");
    console.log(this.previewProjectedBenefitsListCoverted);
  }

  getTable(){
    
    return document.querySelector("table");
  }
  
  exportExcel() {
    import("xlsx").then(xlsx => {

      let example = [

        {
          impactAreaTitle: 'Impact Area: Nutrition, health and food security',
          indicators: [
            {
              impactIndicatorTitle: 'Impact indicator: #cases communicable and noncommunicable diseases',
              probability: 'High certainty',
              dimensions: [
                {
                  breadth: '2.8 Millions of people',
                  depth: 'Life saving',
                  probability: 'High certainty'
                },
                {
                  breadth: '2.5 Millions of people',
                  depth: 'Perceptible',
                  probability: 'High certainty'
                },
                {
                  breadth: '3.1 Millions of people',
                  depth: 'Significant',

                }
              ]
            }

          ]
        }

      ]

      const merge = [

      ];
      let result = [{ a: "Breadth", b: "Depth", c: "Probability" }];
      let index = 0;
      example.map((impactArea) => {
        index++;
        result.push({ a: impactArea.impactAreaTitle, b: '', c: '' })
        merge.push({ s: { r: index, c: 0 }, e: { r: index, c: 2 } })

        impactArea.indicators.map((indicator) => {

          index++;
          result.push({ a: indicator.impactIndicatorTitle, b: '', c: '' })
          merge.push({ s: { r: index, c: 0 }, e: { r: index, c: 2 } })
          indicator.dimensions.map((dimension) => {
            result.push({ a: dimension.breadth, b: dimension.depth, c: dimension.probability })
          })

        })

      })

      var worksheet = xlsx.utils.json_to_sheet(result, { header: ["a", "b", "c"], skipHeader: true });

      var wscols = [
        { wpx: 250 },
        { wpx: 250 },
        { wpx: 250 },
      ];

      worksheet['!cols'] = wscols;
      worksheet["!merges"] = merge;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      xlsx.utils.sheet_add_aoa(workbook, [[123]], { origin: 'A1' });
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this._manageExcelService.saveAsExcelFile(excelBuffer, "partners");
    });
  }


}
