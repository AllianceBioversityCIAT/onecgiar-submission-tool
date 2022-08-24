import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttributesListConfiguration } from './CompactInformationTableView.interface';
import { InitiativesService } from '../../services/initiatives.service';
import { ManageDocxService } from '../../../pages/stages-container/stages/full-proposal/services/manage-docx.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-compact-information-table-view',
  templateUrl: './compact-information-table-view.component.html',
  styleUrls: ['./compact-information-table-view.component.scss']
})
export class CompactInformationTableViewComponent implements OnInit {
  @Input() list: any[] = []; //? list
  @Input() attr_list_config:AttributesListConfiguration[] = []; //? attribute omission list
  @Input() canDelete:boolean = true;
  @Input() tableTitle: string = "";
  @Input() msgNoData: string = "";
  @Input() showTableViewVariable:boolean = true;
  @Input() localId: boolean = false;
  @Input() exportDocx: boolean = false;
  @Input() configExport: configDocx;
  @Output() buttonViewEvent = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  



  constructor(
    public _initiativesService:InitiativesService,
    private _manageDocxService:ManageDocxService,
    private _date: DatePipe
  ) { }

  ngOnInit(): void {
  }

  downloadDocx() {
    if(!this.exportDocx) return;
    const dateStamp = new Date();
    this._manageDocxService.createExport(
      this.configExport.configHeaderTable, 
      this.list, 
      this._date.transform(dateStamp,'yyyyLLdd_HHmmSS'),
      this.configExport.actionArea,
      this.configExport.subtex, 
      this.configExport.complex);
  }

  onbuttonViewEvent(){
    console.log("button event")
    this.showTableViewVariable = !this.showTableViewVariable;
    this.buttonViewEvent.emit(this.showTableViewVariable);
  }

  editItem(item){
    this.collapseAll();
    this.onEdit.emit(item);
    this.showTableViewVariable = false;
    this.buttonViewEvent.emit( this.showTableViewVariable);
  }

  deleteItem(item,i?){
    if (item?.id){
      console.log("logic remove")
      item.active = false;
    }else{
      console.log("remove from array")
      this.list.splice(i,1);
    }
  }

  collapseAll(){
    this.list.map((resp:any)=>{
      resp.collapse = true;
    })
  }

  setLocalId(){
    if(this.localId){
      return [{
                attribute: 'local_id',
                name: "ID",
              },...this.attr_list_config];
    }else{
      return this.attr_list_config;
    }
  }

}

interface configDocx{
  complex: boolean,
  subtex: string,
  actionArea: string,
  configHeaderTable: any[]
}

