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

  citationColAndTable={
    table_name: "context", 
    col_name: "key_learnings",
    active: true
  }

  citationsList=[]

  ngOnInit(): void {
    this.getContext();
    this.getLinks();
  }

  getLinks(){
    this._initiativesService.getLinks(this.citationColAndTable,this._initiativesService.initiative.id,3).subscribe(resp=>{
      this.citationsList = resp.response.getLinks;
      this.citationsList.map(resp=>{
        resp.citationId = resp.id
      })
    })
  }

  async addCitationColAndTableInList(citationsList,citationColAndTable){
    await citationsList.map(citation=>{
      citation.table_name = citationColAndTable.table_name;
      citation.col_name = citationColAndTable.col_name;
    })
  }

  upserInfo(){
    //save narrative
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      this.contextForm.valid?
      this._interactionsService.successMessage('Learning from prior evaluations and Impact Assessments (IA) has been saved'):
      this._interactionsService.warningMessage('Learning from prior evaluations and Impact Assessments (IA) has been saved, but there are incomplete fields')
    })
    //save links
    this.addCitationColAndTableInList(this.citationsList,this.citationColAndTable).then(()=>{
      this._initiativesService.addLinks(this.citationsList,this._initiativesService.initiative.id,3).then(resp=>{
        this.getLinks();
      })
      
    })

  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      this.contextForm.controls['key_learnings'].setValue(resp?.response?.context?.key_learnings);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
    },err=>{
      console.log(err);
    })
  }




}
