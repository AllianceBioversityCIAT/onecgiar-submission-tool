import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { selectOptions} from '../../../models/forms-options/select-options.interface';

@Component({
  selector: 'custom-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options:selectOptions;
  selectInput:FormControl;
  constructor() { }

  ngOnInit(): void {
    this.selectInput = new FormControl(this.options.form.value[this.options.formControlId], [
      Validators.required,
    ]);
     this.setValue(null);
  }

  setValue(event: MatSelectChange){
    if (event && this.options.formControlName) {
      this.options.form.controls[this.options.formControlName].setValue(event.source.triggerValue);
    }

    this.options.form.controls[this.options.formControlId].setValue(this.selectInput.value);
  }  

  disableOption(option){
    if ( this.options.toDisableList) {
      for (const id of this.options.toDisableList) {
        if (option.id==id) {
          return true;
        }
      }
    }else{
      return false;
    }
  }

}
