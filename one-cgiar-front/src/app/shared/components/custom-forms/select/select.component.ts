import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { selectOptions} from '../../../models/forms-options/select-options.interface';

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
    console.log('%cOption','background: #222; color: #37ff73');
    console.log(data);
    this.options.form.controls[this.options.formControlName].setValue(data.acronym_name);
    this.options.form.controls[this.options.formControlId].setValue(data.code);
    this.selectInput.setValue(data[this.options.formControlName]);
    console.log('%cForm','background: #222; color: #fd8484');
    console.log(this.options.form.value);
  }


  consumeService() {
    if (this.options.service && !this.options.selectList) {
      this.options.service[this.options.serviceFunction](this.searchText).subscribe((res) => {
        console.log("Que locura !!!");
        console.log(res.response.institutions);
        this.selectList = res.response.institutions;
        res.response.institutions.map(institution=>{
          institution.acronym_name = `${institution.acronym} - ${institution.name}`;
        })
      });
    }
  }


}
