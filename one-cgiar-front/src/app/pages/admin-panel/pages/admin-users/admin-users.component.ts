import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InitiativesService } from '../../../../shared/services/initiatives.service';
import { ManageExcelService } from '../../../stages-container/stages/full-proposal/services/manage-excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  usersList = [];
  loading: boolean = true;

  constructor( 
    private _manageExcelService:ManageExcelService,
    private _interactionsService:InitiativesService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getUsersWithInitiativesInformation();
  }

  getUsersWithInitiativesInformation(){
    this._interactionsService.getUsersWithInitiativesInformation().subscribe(resp=>{
      this.usersList = resp.data;
      this.loading = false;
    })
  }

  roles = [
    { label: "Lead", value: "Lead" },
    { label: "Co-Lead", value: "Co-Lead" },
    { label: "Coordinator", value: "Coordinator" }];

  clear(table: Table) {
    table.clear();
}

exportExcel() {
  const dateStamp = new Date();
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.usersList);
    var wscols = [
      {wpx:70},
      {wpx:300},
      {wpx:100},
      {wpx:100},
      {wpx:100},
      {wpx:100}
  ];
  
  worksheet['!cols'] = wscols;
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

    this._manageExcelService.saveAsExcelFile(excelBuffer, `Users reporting_${this.datepipe.transform(dateStamp,'yyyyLLdd_HHmmSS')}`);
  });
}

}
