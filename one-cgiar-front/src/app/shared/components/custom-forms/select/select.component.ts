import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    this.selectInput = new FormControl(this.options.form.value[this.options.formControlName], [
      Validators.required,
    ]);
     this.setValue();
  }

  setValue(){
    this.options.form.controls[this.options.formControlName].setValue(this.selectInput.value);
  }  
}
