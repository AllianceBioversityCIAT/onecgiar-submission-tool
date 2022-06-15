import { Component, OnInit } from '@angular/core';
import { AttributesListConfiguration } from '../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';
import { ParticipatoryProcess } from '../context/participatory-design-process/interfaces/Participatory-interface';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataValidatorsService } from '../../../shared/data-validators.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { map } from 'rxjs/operators';
import { FullProposalService } from '../../../../../../shared/services/full-proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-isdc-feedback-responses',
  templateUrl: './isdc-feedback-responses.component.html',
  styleUrls: ['./isdc-feedback-responses.component.scss']
})
export class IsdcFeedbackResponsesComponent implements OnInit {

  showTableViewVariable = true;
  extraValidation = false;
  showform = false;
  constList = [];
  list:ParticipatoryProcess[] = [];
  contextForm: FormGroup;
  attr_list_config: AttributesListConfiguration[] = [
    {
      attribute: 'isdc_recommendation',
      name: "ISDC recommendation",
    },
    {
      attribute: 'response',
      name: "Initiative response",
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
    private _dataValidatorsService:DataValidatorsService,
    private _interactionsService:InteractionsService,
    private spinnerService: NgxSpinnerService,
    public _fullProposalService:FullProposalService,
    public _dataControlService:DataControlService,
    private _authService:AuthService
  ) {
    this.contextForm = new FormGroup({
      participatory_design: new FormControl(null, Validators.required),
      contextId:new FormControl(null),
    });
   }

  ngOnInit(): void {
    this.getContext();
    this.getRecommendationsByInitId();
    document.addEventListener('keydown', () => {
      this.initExtraValidation();
    });
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

  onSubmitRecommendations(){
    if(this.extraValidation){
      console.log('set function')
    }
  }

  getTabIndex(e){
    this.showTableViewVariable = e;
  }

  initExtraValidation(){
    this.extraValidation = this.valideteInputTable();
  }

  getItemToExpand(item){
    console.log(this.list.find(meliaItem=>meliaItem?.id == item?.id)['collapse'] = false)
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

  upserInfo(){
    this._fullProposalService.patchContext(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id,this.contextForm.value).subscribe(resp=>{
      this.contextForm.controls['contextId'].setValue(resp?.response?.context?.id);
      this.contextForm.valid && this.valideteInputTable() &&  this.extraValidation?
      this._interactionsService.successMessage('The information in this section has been saved'):
      this._interactionsService.warningMessage('The information in this section has been saved, but there are incomplete fields.', 6000)
    })
    //save recommendations
    console.log(this.changesFiltering())
    this._initiativesService.patchRecommendationByInitId(this.changesFiltering()).subscribe(resp=>{
      this.getRecommendationsByInitId();
      this.showTableViewVariable = true;
    })
  }

  getRecommendationsByInitId(){
    if(this._initiativesService.initiative.stageId !== 4) return;
    this._initiativesService.getRecommendationsByInitId().pipe(map(res=>res?.response?.ISDCResponses)).subscribe((resp:ParticipatoryProcess[])=>{
    this.list = resp;
    this.constList = [];
    this.list.forEach(e => this.constList.push(e.updated_response));
    this.extraValidation = this.valideteInputTable();
    this.initExtraValidation();
    //this.extraValidation = this.extraValidation && this.filterIncompleteData();
    })
  }

  changesFiltering(){
    console.log(this.list[0].updated_response);
    console.log(this.constList[0]);
    let filterData = this.list.filter( (r, index) => r.updated_response != this.constList[index]); 
    return filterData.map(e => ({...e, user_id: this._authService.userValue.id}));
  }

}
