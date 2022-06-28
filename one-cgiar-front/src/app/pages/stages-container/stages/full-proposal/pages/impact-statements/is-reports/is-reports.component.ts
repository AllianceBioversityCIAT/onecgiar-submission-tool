import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { PreviewPartners } from './models/previewPartners.interface';
import { ManageExcelService } from '../../../services/manage-excel.service';
import { UtilsService } from '../../../../../../../shared/services/utils.service';
@Component({
  selector: 'app-is-reports',
  templateUrl: './is-reports.component.html',
  styleUrls: ['./is-reports.component.scss']
})
export class IsReportsComponent implements OnInit {
  previewPartners = [];
  notArePreviewPartners = false;
  headerPreviewPartners = ['code', 'acronym', 'institution_type', 'office_location', 'name', 'impact_area',  'demand',  'innovation',  'scaling',   'website'];
  constructor(
    private _initiativesService: InitiativesService,
    private _manageExcelService: ManageExcelService,
    public _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('Partners list summary report');
    this.getPreviewPartners();
  }

  getPreviewPartners(){
    this._initiativesService.getPreviewPartners(this._initiativesService.initiative.id).subscribe(resp=>{
      this.previewPartners = resp.response.previewPartners
      if (!this.previewPartners.length) this.notArePreviewPartners = true;
      console.log(this.previewPartners);
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {

      let prePart =  JSON.parse(JSON.stringify(this.previewPartners))
      prePart.map(item=>{
        item.demand = item?.demand?'Yes':'No';
        item.innovation = item?.innovation?'Yes':'No';
        item.scaling = item?.scaling?'Yes':'No';
      });

      const worksheet = xlsx.utils.json_to_sheet(prePart);
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
