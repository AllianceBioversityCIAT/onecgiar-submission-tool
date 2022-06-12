import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';
import { IsBody } from './interface/pc-Initiative-statements.interface';

@Component({
  selector: 'app-pc-initiative-statements',
  templateUrl: './pc-initiative-statements.component.html',
  styleUrls: ['./pc-initiative-statements.component.scss']
})
export class PcInitiativeStatementsComponent implements OnInit {
  body:IsBody = {
    highlights : [
      {
        name:'Highlight 1',
        id:null,
        description:''
      },
      {
        name:'Highlight 2',
        id:null,
        description:''
      },
      {
        name:'Highlight 3',
        id:null,
        description:''
      },
      {
        name:'Highlight 4',
        id:null,
        description:''
      },
      {
        name:'Highlight 5',
        id:null,
        description:''
      }
    ],
    context: {
      id:null,
      challenge_statement:'',
      smart_objectives:'',
      active:true
    }
  }
  constructor(
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation(){
    this._initiativesService.getInitiativeStatements(this._initiativesService.initiative.id).subscribe(resp=>{
      this.updateObject(resp.response.initiativeStatemente as IsBody);
    })
  }

  updateObject(data:IsBody){


    data.highlights.map((resp,i)=>{
      this.body.highlights[i].id = resp?.id || null;
      this.body.highlights[i].description = resp?.description || null;
    })

    this.body.context.id = data?.context?.id || null;;
    this.body.context.challenge_statement = data?.context?.challenge_statement || null;;
    this.body.context.smart_objectives = data?.context?.smart_objectives || null;;

    // data.highlights



  }

  saveSection() {
    console.log(this.body)
    this._initiativesService.patchInitiativeStatements(this._initiativesService.initiative.id, this.body).subscribe(resp=>{
      console.log(resp)
      this.getInformation();
    }) 
  }

}
