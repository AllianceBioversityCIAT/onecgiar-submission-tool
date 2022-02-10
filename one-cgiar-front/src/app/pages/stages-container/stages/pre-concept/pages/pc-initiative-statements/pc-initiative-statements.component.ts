import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-pc-initiative-statements',
  templateUrl: './pc-initiative-statements.component.html',
  styleUrls: ['./pc-initiative-statements.component.scss']
})
export class PcInitiativeStatementsComponent implements OnInit {
  body = {
    highlightsList : [
      {
        value:''
      },    {
        value:''
      },    {
        value:''
      },    {
        value:''
      },    {
        value:''
      }
    ],
    challengeStatement:'',
    objectiveStatement: ''
  }
  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation(){

  }

  updateObject(){

  }

  saveSection() {
    console.log("saveSection")  
  }

}
