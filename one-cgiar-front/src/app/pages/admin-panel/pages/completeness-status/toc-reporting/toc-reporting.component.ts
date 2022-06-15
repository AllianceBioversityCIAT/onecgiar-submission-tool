import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';
import { ManageExcelService } from '../../../../stages-container/stages/full-proposal/services/manage-excel.service';

@Component({
  selector: 'app-toc-reporting',
  templateUrl: './toc-reporting.component.html',
  styleUrls: ['./toc-reporting.component.scss']
})
export class TocReportingComponent implements OnInit {

  listReporting: Array<any> = [];

  constructor( 
    private _manageExcelService:ManageExcelService,
    private _initiativesService: InitiativesService ) { }

  ngOnInit(): void {
    this.getISDCStatus();
  }

  getISDCStatus(){
    this._initiativesService.getTOCReporting().subscribe(e => {
      this.listReporting = e.response.TOCResponses;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {

      const xlsExport = this.listReporting.map(e=>({official_code:e.official_code,
                                                    name:e.name,
                                                    output:e.output,
                                                    outcome:e.outcome,
                                                    eoi_outcome:e.eoi_outcome
                                                  }));
      const worksheet = xlsx.utils.json_to_sheet(xlsExport);
      var wscols = [
        {wpx:100},
        {wpx:300},
        {wpx:50},
        {wpx:50},
        {wpx:50}
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this._manageExcelService.saveAsExcelFile(excelBuffer, `Toc Reporting`);
    });
  }

}
