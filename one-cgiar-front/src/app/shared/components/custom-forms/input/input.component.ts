import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { Editor,Toolbar } from 'ngx-editor';
import { inputOptions } from '../../../models/forms-options/input-options.interface';

@Component({
  selector: 'custom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() options:inputOptions;
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
    this.textareaInput = new FormControl(this.options.form.value[this.options.formControlName], [
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
    ['bold', 'italic'],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
