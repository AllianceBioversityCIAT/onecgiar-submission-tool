import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttributesListConfiguration } from './CompactInformationTableView.interface';
import { InitiativesService } from '../../services/initiatives.service';

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
  @Output() buttonViewEvent = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  showTableViewVariable:boolean = true;
  



  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    console.log(this.list)
    console.log(this.attr_list_config)
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

}

