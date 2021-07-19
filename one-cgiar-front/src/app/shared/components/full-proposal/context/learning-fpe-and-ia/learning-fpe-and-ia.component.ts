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

  ngOnInit(): void {
    this.getContext();
    console.log(this.contextForm.value);
  }

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      console.log(resp);
      this.contextForm.valid?
      this._interactionsService.successMessage('Comparative advantage has been saved'):
      this._interactionsService.warningMessage('Comparative advantage has been saved, but there are incomplete fields')
    })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.contextForm.controls['key_learnings'].setValue(resp?.response?.context?.key_learnings);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
    },err=>{
      console.log("errorerekkasssssssssssssssdasda");
    })
  }


}
