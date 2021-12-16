import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { PreviewPartners } from './models/previewPartners.interface';
import { ManageExcelService } from '../../../services/manage-excel.service';
import { UtilsService } from '../../../../../../../shared/services/utils.service';
@Component({
  selector: 'app-is-resports',
  templateUrl: './is-resports.component.html',
  styleUrls: ['./is-resports.component.scss']
})
export class IsResportsComponent implements OnInit {
  previewPartners = [];
  notArePreviewPartners = false;
  headerPreviewPartners = ['code', 'acronym', 'institution_type', 'office_location', 'name', 'impact_area',  'demand',  'innovation',  'scaling',   'website'];
  constructor(
    private _initiativesService: InitiativesService,
    private _manageExcelService: ManageExcelService,
    public _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    this.getPreviewPartners();
  }

  getPreviewPartners(){
    this._initiativesService.getPreviewPartners(this._initiativesService.initiative.id,3).subscribe(resp=>{
      this.previewPartners = resp.response.previewPartners
      if (!this.previewPartners.length) this.notArePreviewPartners = true;
      console.log(this.previewPartners);
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.previewPartners);
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


      this._manageExcelService.saveAsExcelFile(excelBuffer, `${this._initiativesService.initiative.official_code} Partners Report` );
    });
  }

}
