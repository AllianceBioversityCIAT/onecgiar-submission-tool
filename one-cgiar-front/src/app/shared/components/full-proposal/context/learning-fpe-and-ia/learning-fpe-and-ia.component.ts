import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-learning-fpe-and-ia',
  templateUrl: './learning-fpe-and-ia.component.html',
  styleUrls: ['./learning-fpe-and-ia.component.scss']
})
export class LearningFpeAndIaComponent implements OnInit {
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
