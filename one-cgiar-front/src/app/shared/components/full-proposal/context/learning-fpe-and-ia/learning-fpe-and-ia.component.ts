import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { FullProposalService } from '../../../../services/full-proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionsService } from '../../../../services/interactions.service';
@Component({
  selector: 'app-learning-fpe-and-ia',
  templateUrl: './learning-fpe-and-ia.component.html',
  styleUrls: ['./learning-fpe-and-ia.component.scss']
})
export class LearningFpeAndIaComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService
  ) { 
    this.contextForm = new FormGroup({
      key_learnings: new FormControl(null),
      contextId:new FormControl(null),
    });
  }

  citationsList=[
    {
      title:'lorem 1',
      link: 'exmaple1.com',
      edited:false,
      citationId: 1,
      table_name: 'context',
      col_name:'key_learnings',

    },
    {
      title:'lorem 2',
      link: 'exmaple2.com',
      edited:true,
      citationId:2,
      table_name: 'context',
      col_name:'key_learnings',
    },
    {
      title:'lorem 3',
      link: 'exmaple3.com',
      edited:false,
      table_name: 'context',
      col_name:'key_learnings',
    }
  ]

  ngOnInit(): void {
    this.getContext();
    this._initiativesService.addLinks(this.citationsList);
  }

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      // console.log(resp);
      this.contextForm.valid?
      this._interactionsService.successMessage('Learning from prior evaluations and Impact Assessments (IA) has been saved'):
      this._interactionsService.warningMessage('Learning from prior evaluations and Impact Assessments (IA) has been saved, but there are incomplete fields')
    })
    console.log(this.citationsList);
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      // console.log(resp);
      this.contextForm.controls['key_learnings'].setValue(resp?.response?.context?.key_learnings);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
    },err=>{
      console.log("errorerekkasssssssssssssssdasda");
    })
  }


}
