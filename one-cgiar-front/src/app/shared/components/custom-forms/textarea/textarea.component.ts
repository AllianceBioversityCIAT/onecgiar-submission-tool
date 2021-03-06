import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { textareaOptions } from '../../../models/forms-options/textarea-options.interface';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import { Editor,Toolbar } from 'ngx-editor';
import { InitiativesService } from '../../../services/initiatives.service';
import { toHTML } from 'ngx-editor';
@Component({
  selector: 'custom-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() options:textareaOptions;
  textareaInput:FormControl;
  wordCount: any;
  // @ViewChild("text") text: ElementRef;
  words: any;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    let options={
      plugins:[]
    };
    this.editor = new Editor(options);
    this.textareaInput = new FormControl(this.options.form.value[this.options.formControlName]?this.options.form.value[this.options.formControlName]:'', [
      Validators.required,
      this.options.maxWords ? this.maxWordsValidator(): Validators.required
    ]);

     this.setValue();
     this.wordCounter()
  }


  setValue(){
    this.options.form.controls[this.options.formControlName].setValue(this.textareaInput.value);
    this.wordCounter();
  }
  wordCounter() {
    this.wordCount = this.textareaInput.value ? this.textareaInput.value.split(/\s+/) : 0;
    this.words = this.wordCount ? (this.wordCount[this.wordCount.length-1]=="" ? this.wordCount.length-1 : this.wordCount.length ) : 0;
  }
  
  maxWordsValidator(): ValidatorFn {  
      return  (control: AbstractControl): { [key: string]: any } | null => this.words < this.options.maxWords ? null:{maxWords: control.value};
  }

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic','underline'],
    ['link'],
  ];
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
