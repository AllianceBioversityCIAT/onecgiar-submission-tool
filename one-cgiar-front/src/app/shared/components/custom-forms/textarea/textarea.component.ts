import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { textareaOptions } from '../../../models/forms-options/textarea-options.interface';

@Component({
  selector: 'custom-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() options:textareaOptions;
  formTextarea:FormGroup;

  constructor() { }
   
  ngOnInit(): void {
    this.formTextarea = new FormGroup({
      text: new FormControl(this.options.form.value[this.options.formControlName], Validators.required),
     });
     this.setValue();
  }
  
  setValue(){
    this.options.form.controls[this.options.formControlName].setValue(this.formTextarea.value.text);
  }

}
