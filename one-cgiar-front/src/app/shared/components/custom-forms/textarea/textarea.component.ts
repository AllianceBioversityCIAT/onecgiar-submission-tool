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
  @Output() value = new EventEmitter<any>();
  formTextarea:FormGroup;

  constructor() { }
   
  ngOnInit(): void {
    this.formTextarea = new FormGroup({
      text: new FormControl(this.options.inputValue, Validators.required),
     });;
  }
  
  setValue(){
    this.value.emit(this.formTextarea.value.text);
  }

}
