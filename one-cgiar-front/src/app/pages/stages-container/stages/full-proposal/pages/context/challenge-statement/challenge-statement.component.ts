import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { FullProposalService } from '../../../../../../../shared/services/full-proposal.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';


@Component({
  selector: 'app-challenge-statement',
  templateUrl: './challenge-statement.component.html',
  styleUrls: ['./challenge-statement.component.scss']
})
export class ChallengeStatementComponent implements OnInit {
  challengeStatementForm: FormGroup;
  showfrom = false;
  extraValidation = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService,
    public _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService
  ) { 
    this.challengeStatementForm = new FormGroup({
      challenge_statement: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getContext();
    this.formChanges();
  }

  upserInfo(){
    //console.log(this.challengeStatementForm);
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.challengeStatementForm.value).subscribe(resp=>{
      this.challengeStatementForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.challengeStatementForm.valid?
      this._interactionsService.successMessage('Challenge statement has been saved'):
      this._interactionsService.warningMessage('Challenge statement has been saved, but there are incomplete fields')
    })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.id).subscribe(resp=>{
      this.challengeStatementForm.controls['challenge_statement'].setValue(resp?.response?.context?.challenge_statement);
      this.challengeStatementForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showfrom = true;
      this.spinnerService.hide('spinner');
    },err=>{
      //console.log("errorerekkasssssssssssssssdasda");
    })
  }

  formChanges(){
    this.challengeStatementForm.valueChanges.subscribe(resp=>{
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.challengeStatementForm.get("challenge_statement").value, 500);
    })
  }

}
