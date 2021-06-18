import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-comparative-advantage',
  templateUrl: './comparative-advantage.component.html',
  styleUrls: ['./comparative-advantage.component.scss']
})
export class ComparativeAdvantageComponent implements OnInit {
  challengeStatementForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) { 
    this.challengeStatementForm = new FormGroup({
      challengeStatement: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  upserInfo(){

  }

}
