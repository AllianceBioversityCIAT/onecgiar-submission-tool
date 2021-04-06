import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { multipleChoiceOptions } from '../../../models/forms-options/multiple-choice.interface';

@Component({
  selector: 'custom-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
  @Input() options:multipleChoiceOptions;
  searchText:string;
  listSelected = [
  ]
  constructor() { }
  ngOnInit(){ }

  addItem(item){
    this.searchText = "";
    this.listSelected.push(item);
    console.log(this.listSelected);
  }

  removeItem(){
    console.log("Remove item");
  }

  disableOption(option){
    if ( this.listSelected) {
      for (const item of this.listSelected) {
        if (option.um49Code==item.um49Code) {
          return true;
        }
      }
    }else{
      return false;
    }
  }

}
