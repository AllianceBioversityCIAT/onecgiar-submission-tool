import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FullProposalService } from '@app/shared/services/full-proposal.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';

@Component({
  selector: 'app-measurable-objectives',
  templateUrl: './measurable-objectives.component.html',
  styleUrls: ['./measurable-objectives.component.scss']
})
export class MeasurableObjectivesComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  extraValidation = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService
  ) { 
    this.contextForm = new FormGroup({
      smart_objectives: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getContext();
    this.formChanges();
  }

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.contextForm.valid?
      this._interactionsService.successMessage('Measurable three-year outcomes has been saved'):
      this._interactionsService.warningMessage('Measurable three-year outcomes has been saved, but there are incomplete fields')
    })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      // console.log(resp);
      this.contextForm.controls['smart_objectives'].setValue(resp?.response?.context?.smart_objectives);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
    },err=>{
      //console.log("errorerekkasssssssssssssssdasda");
    })
  }

  formChanges(){
    this.contextForm.valueChanges.subscribe(resp=>{
      //console.log("changes");
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.contextForm.get("smart_objectives").value, 250);
    })
  }

}
