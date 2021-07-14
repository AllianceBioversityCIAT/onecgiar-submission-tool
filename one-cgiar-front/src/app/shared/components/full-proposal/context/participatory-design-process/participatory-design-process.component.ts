import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-participatory-design-process',
  templateUrl: './participatory-design-process.component.html',
  styleUrls: ['./participatory-design-process.component.scss']
})
export class ParticipatoryDesignProcessComponent implements OnInit {
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
