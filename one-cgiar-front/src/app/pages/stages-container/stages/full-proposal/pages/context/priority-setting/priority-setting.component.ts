import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { FullProposalService } from '../../../../../../../shared/services/full-proposal.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-priority-setting',
  templateUrl: './priority-setting.component.html',
  styleUrls: ['./priority-setting.component.scss']
})
export class PrioritySettingComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  citationColAndTable={table_name: "context", col_name: "priority_setting", active: true}
  citationsList=[];
  extraValidation = false;

  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService,
    public _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService
  ) { 
    this.contextForm = new FormGroup({
      priority_setting: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Priority setting')
    this.getContext();
    this.getLinks();
    this.formChanges();
  }

  getLinks(){
    this._initiativesService.getLinks(this.citationColAndTable,this._initiativesService.initiative.id).subscribe(resp=>{
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
    this._fullProposalService.patchContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.contextForm.valid  && this.extraValidation?
      this._interactionsService.successMessage('Priority setting has been saved'):
      this._interactionsService.warningMessage('Priority setting has been saved, but there are incomplete fields')
    })
        //save links
        this.addCitationColAndTableInList(this.citationsList,this.citationColAndTable).then(()=>{
          this._initiativesService.addLinks(this.citationsList,this._initiativesService.initiative.id).then(resp=>{
            this.getLinks();
          })
          
        })
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id).subscribe(resp=>{
      //console.log(resp);
      this.contextForm.controls['priority_setting'].setValue(resp?.response?.context?.priority_setting);
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
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.contextForm.get("priority_setting").value);
    })
  }


}
