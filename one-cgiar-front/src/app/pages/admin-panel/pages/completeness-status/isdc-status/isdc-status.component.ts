import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';
import { ManageExcelService } from '../../../../stages-container/stages/full-proposal/services/manage-excel.service';
import { DatePipe } from '@angular/common';
import { DataControlService } from '../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-isdc-status',
  templateUrl: './isdc-status.component.html',
  styleUrls: ['./isdc-status.component.scss']
})
export class IsdcStatusComponent implements OnInit {

  listStatus: Array<any> = [];
  loading: boolean = true;

  constructor( 
    private _manageExcelService:ManageExcelService,
    private _initiativesService: InitiativesService,
    public datepipe: DatePipe,
    public _dataControlService: DataControlService) { }

  ngOnInit(): void {
    this.getISDCStatus();
  }

  getISDCStatus(){
    this._initiativesService.getIsdcStatus().subscribe(e => {
      this.listStatus = e.response.ISDCResponses.map(e => ({...e, 
                                                            pending: parseInt(e.pending), 
                                                            responses: parseInt(e.responses), 
                                                            total_comments:parseInt(e.total_comments), 
                                                            average: parseInt(e.average)}));
                                                            console.log(this.listStatus);
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    const dateStamp = new Date();
    const xlsExport = this.listStatus.map(e=>({
      official_code:e.official_code,
      name:e.name,
      total_comments:e.total_comments,
      responses:e.responses,
      pending:e.pending,
      average:`${e.average}%`
    }));
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(xlsExport);
      var wscols = [
        {wpx:100},
        {wpx:300},
        {wpx:50},
        {wpx:50},
        {wpx:50},
        {wpx:50}
    ];
    
    worksheet['!cols'] = wscols;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this._manageExcelService.saveAsExcelFile(excelBuffer, `ISDC Comments status_${this.datepipe.transform(dateStamp,'yyyyLLdd_HHmmSS')}`);
    });
  }

}
