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

  constructor() { 
  }
  ngOnInit(){ 
  }

  addItem(item,disabled){
    if (!disabled) {
      this.searchText = "";
      item.new = true;
      this.options.selectedList.push(item);
      console.log(item);
    }
  }

  removeItem(index){
    console.log("Remove item");
    this.options.selectedList.splice(index, 1); 
  }

  disableOption(option){
    if ( this.options.selectedList) {
      for (const item of this.options.selectedList) {
        if (option[this.options.selectItemId]==item[this.options.selectedItemId]) {
          return true;
        }
      }
    }else{
      return false;
    }
  }
  

}
