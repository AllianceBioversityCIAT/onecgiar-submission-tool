import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { FullProposalService } from '../../../../services/full-proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionsService } from '../../../../services/interactions.service';
@Component({
  selector: 'app-measurable-objectives',
  templateUrl: './measurable-objectives.component.html',
  styleUrls: ['./measurable-objectives.component.scss']
})
export class MeasurableObjectivesComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService
  ) { 
    this.contextForm = new FormGroup({
      smart_objectives: new FormControl(null),
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
      this._interactionsService.successMessage('Measurable three-year outcomes has been saved'):
      this._interactionsService.warningMessage('Measurable three-year outcomes has been saved, but there are incomplete fields')
    })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.contextForm.controls['smart_objectives'].setValue(resp?.response?.context?.smart_objectives);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
    },err=>{
      console.log("errorerekkasssssssssssssssdasda");
    })
  }

}
