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
  msgNoData = 'The initiative does not have feedback';
  list:ParticipatoryProcess[] = [];
  showTableViewVariable = true;
  attr_list_config: AttributesListConfiguration[] = [
    {
      attribute: 'isdc_recommendation',
      name: "ISDC recommendation",
    },
    {
      attribute: 'response',
      name: "ClimBeR responses",
    },
    {
      attribute: 'updated_response',
      name: "Updated Response based on progress after initial 6 month inception to 30 June",
      required: true,
      styles:{'min-width':'200px'}
    }
  ];

  constructor(
    public _initiativesService:InitiativesService,
    public _fullProposalService:FullProposalService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService,
    public _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService,
    private _authService:AuthService

  ) { 
    this.contextForm = new FormGroup({
      participatory_design: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getContext();
    this.getLinks();
    this.getRecommendationsByInitId();
    document.addEventListener('keydown', () => {
      this.initExtraValidation();
    });
  }

  getTabIndex(e){
    this.showTableViewVariable = e;
  }

  initExtraValidation(){
    this.extraValidation = this.valideteInputTable() && this._dataValidatorsService.wordCounterIsCorrect(this.contextForm.get("participatory_design").value, 500);
  }

  getItemToExpand(item){
    console.log(this.list.find(meliaItem=>meliaItem?.id == item?.id)['collapse'] = false)
  }

  getRecommendationsByInitId(){
    if(this._initiativesService.initiative.stageId !== 4) return;
    this._initiativesService.getRecommendationsByInitId().pipe(map(res=>res?.response?.ISDCResponses)).subscribe((resp:ParticipatoryProcess[])=>{
    this.list = resp.map(e => {
      this.extraValidation = this.valideteInputTable() && this._dataValidatorsService.wordCounterIsCorrect(this.contextForm.get("participatory_design").value, 500);
      return {...e, user_id: this._authService.userValue.id};
    });
    //this.extraValidation = this.extraValidation && this.filterIncompleteData();
    })
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
      this.contextForm.valid && this.valideteInputTable() &&  this.extraValidation?
      this._interactionsService.successMessage('Participatory design process has been saved'):
      this._interactionsService.warningMessage('Participatory design process has been saved, but there are incomplete fields')
    })
    //save links
    this.addCitationColAndTableInList(this.citationsList,this.citationColAndTable).then(()=>{
      this._initiativesService.addLinks(this.citationsList,this._initiativesService.initiative.id,3).then(resp=>{
        this.getLinks();
      })
      
    })
    //save recommendations
    this._initiativesService.patchRecommendationByInitId(this.list).subscribe(resp=>{
      this.getRecommendationsByInitId();
      this.showTableViewVariable = true;
    })
  }

  valideteInputTable():boolean{
    if(this._initiativesService.initiative.stageId !== 4) return true;
    let dataFilter:boolean = true;
    for (let index = 0; index < this.list.length; index++) {
      if(!this.list[index].updated_response?.length){
        dataFilter = false;
        break;
      } 
    }

    return dataFilter;
  }

  getContext(){
    this.spinnerService.show('spinner');
    this._fullProposalService.getContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id).subscribe(resp=>{
      //console.log(resp);
      this.contextForm.controls['participatory_design'].setValue(resp?.response?.context?.participatory_design);
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.showform = true;
      this.spinnerService.hide('spinner');
      this.initExtraValidation();
    },err=>{
      //console.log("errorerekkasssssssssssssssdasda");
    })
  }

  saveSection(){
    this._initiativesService.patchRecommendationByInitId(this.list).subscribe(resp=>{
      this.getRecommendationsByInitId();
    })

  }

}
