import { Component, Input, OnInit } from '@angular/core';
import { ManageExcelService } from '../../../services/manage-excel.service';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-mpara-reports',
  templateUrl: './mpara-reports.component.html',
  styleUrls: ['./mpara-reports.component.scss']
})
export class MparaReportsComponent implements OnInit {
  // headerPreview = ['risks_achieving_impact', 'description_risk', 'likelihood', 'impact', 'risk_score', 'opportunities_description'];
  headerPreview = [
    {
      headerName : 'risk sachieving impact',
      attributeName : 'a'
    },
    {
      headerName : 'description_risk',
      attributeName : 'b'
    },
    {
      headerName : 'likelihood',
      attributeName : 'c'
    },
    {
      headerName : 'impact',
      attributeName : 'd'
    },
    {
      headerName : 'risk_score',
      attributeName : 'e'
    },
    {
      headerName : 'opportunities_description',
      attributeName : 'f'
    }
  ];
  mergeList = [];
  riskAssessmentList = [];
  previewListCoverted = [];
  constructor(
    private _manageExcelService:ManageExcelService,
    private _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {

    this._initiativesService.getPreviewRiskAssessment(this._initiativesService.initiative.id,3).subscribe(resp=>{
      console.log(resp.response?.previewRiskAssessment?.managePlan?.riskassessment);
      if (!resp.response?.previewRiskAssessment?.managePlan?.riskassessment) return;
      this.objectsTolist(resp.response.previewRiskAssessment.managePlan.riskassessment);
    })
  }

  objectsTolist(previewList) {
    let i = 0;
    previewList?.map((riskA) => {
      let celIndex = i;
      this.previewListCoverted.push({ a: riskA.risks_achieving_impact, b: riskA.description_risk, c:  riskA.likelihood, d: riskA.impact, e: riskA.risk_score, f:  riskA?.opportinities[0]?.opportunities_description});
      i++;
      
      riskA?.opportinities?.map((opportiny, index) => {
        if (index == 0) return;
        i++;
        this.previewListCoverted.push({ b: '', c: '', d: '', e: '', f: opportiny?.opportunities_description || ''});
      })

      // if (!impactArea?.impactIndicators?.dimensions.length) {
      //   i++;
      //   this.previewListCoverted.push({ a: '', b: '', c: impactArea?.impactIndicators?.probability_name, rowspan:1 });
      // }
      // console.log('celIndex ',celIndex);
      // console.log(this.previewListCoverted[celIndex]);
      // console.log(this.previewListCoverted);
      // console.log("------------------------------");
      if (riskA?.opportinities.length >= 2) this.previewListCoverted[celIndex].rowspan = (i + 1) - (celIndex+1) ;
      // this.previewListCoverted[celIndex].rowspan = (i + 1) - (celIndex+1) ;
      this.mergeList.push(
        { s: { r: celIndex+1, c: 0 }, e: { r: i, c: 0 } },
        { s: { r: celIndex+1, c: 1 }, e: { r: i, c: 1 } },
        { s: { r: celIndex+1, c: 2 }, e: { r: i, c: 2 } },
        { s: { r: celIndex+1, c: 3 }, e: { r: i, c: 3 } },
        { s: { r: celIndex+1, c: 4 }, e: { r: i, c: 4 } }
      );

    })

    // console.log(this.previewListCoverted);

   
  }

  getKeys(customer){
    let result = []
    Object.keys(customer).map(item=>{
      if (item == 'rowspan') return;
      result.push(item)
    })
    return result;
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      let result = [{ a: "Top 5", b: "Description of risk", c: "Likeli-hood", d:'Impact ', e:"Risk score", f:"Opportunities" }];

      this.previewListCoverted.map(item=>{
        let body:any = {}
 
        Object.keys(item).map(key=>{
          if (key == 'rowspan') return;
          body[key] = item[key]
        })

        result.push(body)
      })

      console.log(result);

      var worksheet = xlsx.utils.json_to_sheet(result, { header: ["a", "b", "c", "d", "e", "f"], skipHeader: true });

      var wscols = [
        { wpx: 250 },
        { wpx: 250 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
  
      ];

      worksheet['!cols'] = wscols;
      worksheet["!merges"] = this.mergeList;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      xlsx.utils.sheet_add_aoa(workbook, [[123]], { origin: 'A1' });
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this._manageExcelService.saveAsExcelFile(excelBuffer,  `${this._initiativesService.initiative.official_code} Risk assessment Report `);
    });
  }


}
