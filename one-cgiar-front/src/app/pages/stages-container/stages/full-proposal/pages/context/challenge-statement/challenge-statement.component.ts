import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FullProposalService } from '@app/shared/services/full-proposal.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-challenge-statement',
  templateUrl: './challenge-statement.component.html',
  styleUrls: ['./challenge-statement.component.scss']
})
export class ChallengeStatementComponent implements OnInit {
  challengeStatementForm: FormGroup;
  showfrom = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService
  ) { 
    this.challengeStatementForm = new FormGroup({
      challenge_statement: new FormControl(null),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getContext();
    console.log(this.challengeStatementForm.value);
  }

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.id,this.challengeStatementForm.value).subscribe(resp=>{
      console.log(resp);
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
      console.log("errorerekkasssssssssssssssdasda");
    })
  }

}
