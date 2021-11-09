import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { PreviewPartners } from './models/previewPartners.interface';
@Component({
  selector: 'app-is-resports',
  templateUrl: './is-resports.component.html',
  styleUrls: ['./is-resports.component.scss']
})
export class IsResportsComponent implements OnInit {
  previewPartners = [];
  notArePreviewPartners = false;
  headerPreviewPartners = ['code', 'acronym', 'institution_type', 'office_location', 'name', 'action_area',  'demand',  'innovation',  'scaling',   'website'];
  constructor(
    private _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
    this.getPreviewPartnersDataByInitiativeId();
  }

  getPreviewPartnersDataByInitiativeId(){
    this._initiativesService.getPreviewPartnersDataByInitiativeId(this._initiativesService.initiative.id).subscribe(resp=>{
      this.previewPartners = resp.response.previewPartners
      if (!this.previewPartners.length) this.notArePreviewPartners = true;
      console.log(this.previewPartners);
    })
  }

  saveAsExcelFile(buffer: any, fileName: string = "test"): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(this.previewPartners,{ skipHeader: true });
      var wscols = [
        {wpx:300},
        {wpx:250},
        {wpx:100},
        {wpx:80},
        {wpx:150},
        {wpx:100},
        {wpx:100},
        {wpx:100},
        {wpx:100},
        {wpx:250},
        {wpx:100},
        {wpx:50},
        {wpx:70},
        {wpx:50},
        {wpx:100},
        {wpx:100},
        {wpx:150},
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this.saveAsExcelFile(excelBuffer, "partners");
    });
  }

}
