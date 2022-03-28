import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttributesListConfiguration } from './CompactInformationTableView.interface';
import { InitiativesService } from '../../services/initiatives.service';

@Component({
  selector: 'app-compact-information-table-view',
  templateUrl: './compact-information-table-view.component.html',
  styleUrls: ['./compact-information-table-view.component.scss']
})
export class CompactInformationTableViewComponent implements OnInit {
  @Input() list: [] = []; //? list
  @Input() attr_list_config:AttributesListConfiguration[] = []; //? attribute omission list
  @Output() buttonViewEvent = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  showTableViewVariable:boolean = true;
  



  constructor() { }

  ngOnInit(): void {
    console.log(this.list)
    console.log(this.attr_list_config)
  }

  onbuttonViewEvent(){
    console.log("button event")
    this.showTableViewVariable = !this.showTableViewVariable;
    this.buttonViewEvent.emit(this.showTableViewVariable);
  }

  edit(item){
    this.collapseAll();
    this.onEdit.emit(item);
    this.showTableViewVariable = false;
    this.buttonViewEvent.emit( this.showTableViewVariable);
  }

  collapseAll(){
    this.list.map((resp:any)=>{
      resp.collapse = true;
    })
  }

}

