import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { FullProposalService } from '../../../../../../../shared/services/full-proposal.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { map } from 'rxjs/operators';
import { EOIData } from './interfaces/EOIData.interface';
import { UtilsService } from '../../../../../../../shared/services/utils.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { PusherService } from '../../../../../../../shared/services/pusher.service';

@Component({
  selector: 'app-measurable-objectives',
  templateUrl: './measurable-objectives.component.html',
  styleUrls: ['./measurable-objectives.component.scss']
})
export class MeasurableObjectivesComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  extraValidation = false;
  initiativeOutcomeList:EOIData []=[];
  toc_id:number|string;
  lasUpdate: string;
  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService,
    private _dataValidatorsService:DataValidatorsService,
    public _utilsService:UtilsService,
    public _dataControlService:DataControlService,
    private _pusherService:PusherService
  ) { 
    this.contextForm = new FormGroup({
      smart_objectives: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Measurable three-year outcomes')
    this.getEndOfInitiativeOutcome();
    this._pusherService.listenTocChange('table-b-outcomes',()=>{
      this.getEndOfInitiativeOutcome();
    });
  }

  getEndOfInitiativeOutcome(){
    console.log("getEndOfInitiativeOutcome")
    this._initiativesService.getEndOfInitiativeOutcome().pipe(map(res=>res?.response)).subscribe(resp=>{
      this.lasUpdate = resp?.eoiLastUpdate?.updated_at
      this.initiativeOutcomeList = resp?.eoi;
    })
  }

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.contextForm.valid && this.extraValidation?
      this._interactionsService.successMessage('Measurable three-year outcomes has been saved'):
      this._interactionsService.warningMessage('Measurable three-year outcomes has been saved, but there are incomplete fields')
    })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id).subscribe(resp=>{
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
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.contextForm.get("smart_objectives").value);
    })
  }


}
