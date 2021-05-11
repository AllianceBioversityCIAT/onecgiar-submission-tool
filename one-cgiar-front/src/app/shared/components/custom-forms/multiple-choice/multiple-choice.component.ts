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
      this.consumeService();
    }
  }

  removeItem(index){
    console.log("Remove item:" + index);
    this.options.selectedList[index].active = false;
    this.options.selectedList[index].new = true; 
    console.log(this.options.selectedList[index]);
    this.consumeService();
    // this.options.selectedList.splice(index, 1); 
  }

  // disableOption(option){
  //   if ( this.options.selectedList) {
  //     for (const item of this.options.selectedList) {
  //       if (option[this.options.selectItemId]==item[this.options.selectedItemId]) {
  //         return true;
  //       }
  //     }
  //   }else{
  //     return false;
  //   }
  // }

  consumeService() {
    // console.log('%cconsumeService: '+this.options.service.functionName,'background: #222; color: #84c3fd');
    if (this.options.service && !this.options.selectList) {
      this.options.service.serviceTS[this.options.service.functionName](this.searchText).subscribe((res) => {
        // console.log('%ccconsumeService: '+this.options.service.functionName+' info: ','background: #222; color: #37ff73');
        // console.log(res);
        // console.log('%cselected','background: #222; color: #ffff00');
        // console.log(this.options.selectedList);
        // console.log('%call'+this.options.service.objectName,'background: #222; color: #84c3fd');
        // console.log(res.response[this.options.service.objectName]);
        this.selectList = res.response[this.options.service.objectName];
        console.log(this.options.selectedList);
        console.log(this.selectList);

        if (this.selectList.length < 4) {
          this.height = (this.selectList.length * 50) + 'px';
        } else {
          this.height = '200px'
        }

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
        // this.selectList = res.response.institutions;
        // res.response.institutions.map(institution=>{
        //   institution.acronym_name = `${institution.acronym?institution.acronym+' - ':''} ${institution.name}`;
        // })
      });
    }
  }
  

}
