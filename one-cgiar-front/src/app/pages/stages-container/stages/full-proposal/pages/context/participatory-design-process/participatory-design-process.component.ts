import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { FullProposalService } from '../../../../../../../shared/services/full-proposal.service';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { ParticipatoryProcess } from './interfaces/Participatory-interface';
import { AttributesListConfiguration } from '../../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';
import { AuthService } from '../../../../../../../shared/services/auth.service';


@Component({
  selector: 'app-participatory-design-process',
  templateUrl: './participatory-design-process.component.html',
  styleUrls: ['./participatory-design-process.component.scss']
})
export class ParticipatoryDesignProcessComponent implements OnInit {
  contextForm: FormGroup;
  showform = false;
  citationColAndTable={table_name: "context", col_name: "participatory_design", active: true}
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
      participatory_design: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Participatory design process')
    this.getContext();
    this.formChanges();
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
    this._fullProposalService.patchContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.contextForm.valid  &&  this.extraValidation?
      this._interactionsService.successMessage('Participatory design process has been saved'):
      this._interactionsService.warningMessage('Participatory design process has been saved, but there are incomplete fields');
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
    this._fullProposalService.getContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id).subscribe(resp=>{
      //console.log(resp);
      this.contextForm.controls['participatory_design'].setValue(resp?.response?.context?.participatory_design);
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
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.contextForm.get("participatory_design").value, 500);
    })
  }

}
