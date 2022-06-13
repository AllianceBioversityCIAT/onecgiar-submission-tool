import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-isdc-status',
  templateUrl: './isdc-status.component.html',
  styleUrls: ['./isdc-status.component.scss']
})
export class IsdcStatusComponent implements OnInit {

  listStatus: Array<any> = [];

  constructor( private _initiativesService: InitiativesService) { }

  ngOnInit(): void {
    this.getISDCStatus();
  }

  getISDCStatus(){
    this._initiativesService.getIsdcStatus().subscribe(e => {
      this.listStatus = e.response.ISDCResponses;
    });
  }

  clear(table: Table) {
    table.clear();
  }

}
