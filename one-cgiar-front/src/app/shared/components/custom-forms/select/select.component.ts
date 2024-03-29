import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { selectOptions} from '../../../models/forms-options/select-options.interface';
import { InitiativesService } from '../../../services/initiatives.service';

@Component({
  selector: 'custom-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  searchText = '';
  @Input() options:selectOptions;
  selectInput:FormControl;
  selectList=[];
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    this.searchText = this.options.initialSearchText?this.options.initialSearchText:this.searchText;
    this.consumeService();
    this.options.readonly=this._initiativesService.initiative.readonly;
    this.selectInput = new FormControl(this.options.form.value[this.options.formControlId], [
      Validators.required,
    ]);
     this.setValue(null);
     if(this.options.readonly){
       this.getSelectResult();
     }
  }

  setValue(event: MatSelectChange){
    if (event && this.options.formControlName) {
      this.options.form.controls[this.options.formControlName].setValue(event.source.triggerValue);
    }

    this.options.form.controls[this.options.formControlId].setValue(this.selectInput.value);
  }  

  disableOption(option){
    if ( this.options.toDisableList) {
      for (const code of this.options.toDisableList) {
        if (option.code==code) {
          return true;
        }
      }
    }else{
      return false;
    }
  }

  getSelectResult(){
    for (const item of this.options.selectList) {
      if (item[this.options.selectItemId] == this.selectInput.value) {
        return item[this.options.selectItemName];
      }

    }
  }


  removeFocus =false;
  removeFocusSelect(){
    this.removeFocus = true;
    setTimeout(() => {
      this.removeFocus = false
    }, 1);
  }

  addOption(data){
    // console.log('%cOption','background: #222; color: #37ff73');
    // console.log(data);
    // console.log(data[this.options.selectItemName]);
    if (this.options?.formControlName)this.options.form.controls[this.options.formControlName].setValue(data[this.options.selectItemName]);
    this.options.form.controls[this.options.formControlId].setValue(data[this.options.selectItemId]);
    this.selectInput.setValue(data[this.options.formControlName]);
    // console.log('%cForm','background: #222; color: #fd8484');
    // console.log(this.options.form.value);
  }

  height:string;
  // consumeService() {
  //   if (this.options.service && !this.options.selectList) {
  //     this.options.service[this.options.serviceFunction](this.searchText).subscribe((res) => {

  //       this.selectList = res.response.institutions;
  //       if (this.selectList.length < 4) {
  //         this.height = (this.selectList.length * 50) + 'px';
  //       } else {
  //         this.height = '200px'
  //       }


       
  //       res.response.institutions.map(institution=>{
  //         institution.acronym_name = `${institution.acronym?institution.acronym+' - ':''} ${institution.name}`;
  //       })
  //     });
  //   }
  // }
  consumeService() {
    if (this.options.service && !this.options.selectList) {
      this.options.service.serviceTS[this.options.service.functionName]('todo').subscribe((res) => {
        // console.log('%cBuscando: '+this.searchText,'background: #222; color: #84c3fd');
        this.selectList = res.response[this.options.service.objectName];
        // console.log('%c'+this.options.service.functionName,'background: #222; color: #ffff00');
        // console.log(this.selectList);
        if (this.selectList.length < 4) {
          this.height = (this.selectList.length * 50) + 'px';
        } else {
          this.height = '200px'
        }
      });
    }
  }

  writtenInSearchField(){
    console.log("writtenInSearchField");
    // this.mapSelected();
  }

}
