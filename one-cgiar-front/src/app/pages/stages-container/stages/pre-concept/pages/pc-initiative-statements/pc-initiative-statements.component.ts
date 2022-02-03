import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
