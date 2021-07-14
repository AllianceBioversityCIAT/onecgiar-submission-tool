import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-measurable-objectives',
  templateUrl: './measurable-objectives.component.html',
  styleUrls: ['./measurable-objectives.component.scss']
})
export class MeasurableObjectivesComponent implements OnInit {
  sectionForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) {
    this.sectionForm = new FormGroup({
      challengeStatement: new FormControl(''),
    });
   }

  ngOnInit(): void {
  }
  upserInfo(){
    
  }

}
