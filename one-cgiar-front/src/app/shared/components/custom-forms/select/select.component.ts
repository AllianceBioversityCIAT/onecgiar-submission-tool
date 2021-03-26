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
  wordCount: any;
  // @ViewChild("text") text: ElementRef;
  words: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.options.maxWords);
    this.selectInput = new FormControl(this.options.form.value[this.options.formControlName], [
      Validators.required,
    ]);

     this.setValue();
  }


  setValue(){
    console.log('%cchange','background: #222; color: #84c3fd');
    this.options.form.controls[this.options.formControlName].setValue(this.selectInput.value);
  }  
}
