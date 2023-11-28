import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { ManageExcelService } from '../../../services/manage-excel.service';
import { UtilsService } from '../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-human-resources-reports',
  templateUrl: './human-resources-reports.component.html',
  styleUrls: ['./human-resources-reports.component.scss']
})
export class HumanResourcesReportsComponent implements OnInit {

  previewHumanResources = [];
  notArePreviewPartners = false;
  headerPreviewPartners = ['category', 'area_expertise', 'key_accountabilities'];
  constructor(
    private _initiativesService: InitiativesService,
    private _manageExcelService: ManageExcelService,
    public _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('Human Resources preview');
    this.getPreviewHumanResources();
  }

  getPreviewHumanResources(){
    this._initiativesService.getPreviewHumanResources(this._initiativesService.initiative.id).subscribe(resp=>{
      
      this.previewHumanResources = resp.response.previewHumanResources.initiativeTeam;
      console.log(this.previewHumanResources)
      if (!this.previewHumanResources.length) this.notArePreviewPartners = true;
      console.log(this.previewHumanResources);
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.previewHumanResources);
      var wscols = [
        {wpx:100},
        {wpx:100},
        {wpx:250},
        {wpx:80},
        {wpx:250},
        {wpx:200},
        {wpx:100},
        {wpx:100},
        {wpx:100},
        {wpx:250},
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      console.log(excelBuffer)
      this._manageExcelService.saveAsExcelFile(excelBuffer, `${this._initiativesService.initiative.official_code} Human Resources preview`);
    });
  }

}
