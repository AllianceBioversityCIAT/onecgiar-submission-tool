import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../services/initiatives.service';

@Component({
  selector: 'app-challenge-statement',
  templateUrl: './challenge-statement.component.html',
  styleUrls: ['./challenge-statement.component.scss']
})
export class ChallengeStatementComponent implements OnInit {
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
