import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { multipleChoiceOptions } from '../../../models/forms-options/multiple-choice.interface';
import { InitiativesService } from '../../../services/initiatives.service';

@Component({
  selector: 'custom-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
  height:string;
  @Input() options:multipleChoiceOptions;
  searchText:string='';
  removeFocus=false;
  selectList=[];
  constructor(
    public _initiativesService:InitiativesService
  ) { 
  }
  ngOnInit(){ 
    this.consumeService();
  }

  addItem(item,disabled){
    this.removeFocus = true;
    setTimeout(() => {
      this.removeFocus = false
    }, 1);
    // console.log(item);
    // console.log(disabled);
    if (!disabled) {
      this.searchText = "";
      item.new = true;
      item.active = true;
      this.options.selectedList.push(item);
      console.log(item);
      this.options.service.frontendSearchAttribute ? this.mapSelected() : this.consumeService();
    }
  }

  removeItem(index){
    console.log("Remove item:" + index);
    this.options.selectedList[index].active = false;
    this.options.selectedList[index].new = true; 
    console.log(this.options.selectedList[index]);
    this.consumeService();
  }

  writtenInSearchField(){
    console.log("writtenInSearchField");
    this.mapSelected();
  }

  mapSelected(){
    this.selectList.map(itemOfSelectList=>{
        
      if (this.options.selectedList) {
        for (const item of this.options.selectedList) {
          if (itemOfSelectList[this.options.selectItemId] == item[this.options.selectedItemId] && item?.active !== false) {
            itemOfSelectList.selected = true;
            return;
          }else{
            itemOfSelectList.selected = false;
          }
        }
      }

    });
  }

  consumeService() {
    if (this.options.service && !this.options.selectList) {
      this.options.service.serviceTS[this.options.service.functionName](this.searchText).subscribe((res) => {
        this.selectList = res.response[this.options.service.objectName];
        // console.log('%c'+this.options.service.functionName,'background: #222; color: #ffff00');
        // console.log(this.selectList);
        if (this.selectList.length < 4) {
          this.height = (this.selectList.length * 50) + 'px';
        } else {
          this.height = '200px'
        }

        this.mapSelected();
      });
    }
  }
  

}
