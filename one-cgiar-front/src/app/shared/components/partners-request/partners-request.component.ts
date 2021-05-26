import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partners-request',
  templateUrl: './partners-request.component.html',
  styleUrls: ['./partners-request.component.scss']
})
export class PartnersRequestComponent implements OnInit {
  partnersRequestForm: FormGroup;
  @Output() back = new EventEmitter();
  categoryList = [
    {
      name:'test 1',
      id: 1
    }
  ]

  subCategoryList = [
    {
      name:'test 1',
      id: 1
    }
  ]

  constructor() { 
    this.partnersRequestForm = new FormGroup({
      acronym: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      acronym_cgiar_entity: new FormControl(null, Validators.required),
      // category: new FormControl(null, Validators.required),
      // sub_category: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      headquarter_country: new FormControl(null, Validators.required),
      Website: new FormControl(null, Validators.required),
    });
  }


  ngOnInit(): void {
  }

  backAddNewKeyPartner(){
    this.back.emit();
  }

}
