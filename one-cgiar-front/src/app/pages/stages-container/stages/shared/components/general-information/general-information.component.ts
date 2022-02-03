import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StagesMenuService } from '@shared/services/stages-menu.service';
import { ConceptService } from '@app/shared/services/concept.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '@app/shared/services/error.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AppErrorHandler } from '@app/shared/utils/app-error-handler';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { DataControlService } from '@app/shared/services/data-control.service';
import { ManageAccessComponent } from '../manage-access/manage-access.component';
import { DataValidatorsService } from '../../data-validators.service';
import { DevConsole } from '../../../../../../shared/models/dev-console-log';
import { Subscription } from 'rxjs';
import { GeoScope } from '../../../full-proposal/pages/wp-research-plans-and-tocs/fp-work-packages/wp-reports/models/geoScopeModel.interface';
import { RootObject, ServiceResponse } from './interfaces/genetal-information-data.interface';
import { GeneralInfoFullProposalBody } from './interfaces/general-information-fp-body.interface';
import { GeneralInfoPreConceptBody } from './interfaces/general-information-pc-body.interface';
import { GeneralInfoPatchBody } from './interfaces/general-info-patch-body.interface';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  @Input() stageId: number = 0;
  @Input() creator: boolean = false;

  public summaryForm: FormGroup;
  public actionAreas: any[];
  actionAreasList = [];
  fName = "";
  wordCount: any;

  generalInfoFullProposalBody:GeneralInfoFullProposalBody;
  generalInfoPreConceptBody:GeneralInfoPreConceptBody;

  body: ServiceResponse = {
    generalInformation:{
      name:'',
      action_area_description:'',
      action_area_id: null,
      acronym: null
    },
    budget:{
     value: '' 
    },
    geoScope:{
      countries:[],
      regions:[],
      goblalDimension:null
    }
  }; 

  @ViewChild("text") text: ElementRef;
  words: any;
  devprint = new DevConsole();
  localEmitter: Subscription;

  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(
    public conceptSvc: ConceptService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService: InteractionsService,
    public dialog: MatDialog,
    public _initiativesService: InitiativesService,
    public _dataControlService: DataControlService,
    public _dataValidatorsService : DataValidatorsService
  ) {
  }

  ngOnInit(): void {

    this.getActionAreas();

    this.localEmitter = this._dataControlService.generalInfoChange$.subscribe(resp => {

      switch (this.stageId) {
        case 2:
          this.getGeneralInformation();
          break;

        case 3:
          this.getSummary();
          break;
      }
     
    })
    this._dataControlService.generalInfoChange$.emit();

  }

  ngOnDestroy(): void {
    this.localEmitter.unsubscribe()
  }

  getActionAreas(){
    this._initiativesService.getActionAreas().subscribe(resp=>{
      // console.log(resp);
      this.actionAreasList = resp;
    })
  }

  validateFormAndLeads() {
    ((this.body.generalInformation.first_name && this.body.generalInformation.co_first_name) ? true : false)
    if (this.summaryForm.status == 'VALID' && ((this.body.generalInformation.first_name && this.body.generalInformation.co_first_name) ? true : false) == true) {
      return 'VALID';
    } else {
      return 'INVALID'
    }
  }


  getGeneralInformation(){
    if (this.creator) return;
    console.log("getGeneralInformation");
    this._initiativesService.getGeneralInformation(this._initiativesService.initiative.id, this._dataControlService.getStageRouteByStageId(this.stageId).ownPath ).subscribe((resp:RootObject)=>{
      this.body.generalInformation = resp.response.generalInformation;
    })
  }

  getSummary() {
    console.log("getSummary");
    this.spinnerService.show('general-information');

    this._initiativesService.getSummary(this._initiativesService.initiative.id, this.stageId).subscribe((resp:RootObject) => {
      this.body = resp.response;
      console.log(this.body);
    },
      err => {
        console.log(err);
        this.spinnerService.hide('general-information');
      },
      () => {
        this.spinnerService.hide('general-information');
      })


    this.conceptSvc.getActionAreas().subscribe(resp => {
      // console.log(resp);
      this.actionAreas = resp;
      for (let index = 0; index < this.actionAreas.length; index++) {
        this.actionAreas[index].index_name = `Action area ${index + 1} - ${this.actionAreas[index].name}`;
      }
    },
      err => {
        console.log(err);
      })

  }

  validateBudget(){
    return (Number(this.body.budget.value)>=0.1);
  }

  upsertSection() {

    let patchBody:GeneralInfoPatchBody = {
      acronym: this.body.generalInformation.acronym,
      action_area_description: this.body.generalInformation.action_area_description,
      action_area_id: this.body.generalInformation.action_area_id,
      active: true,
      budgetId: this.body.budget.id,
      budget_value: this.body.budget.value,
      col_name: "budget",
      generalInformationId: this.body.generalInformation.generalInformationId,
      is_global: this.body.geoScope.goblalDimension,
      name: this.body.generalInformation.name,
      table_name:"general_information",
    }

    if (this.stageId == 2) this.saveGeneralInformation(patchBody);
    if (this.stageId == 3) this.saveSummary(patchBody);

  }

  saveSummary(patchBody){
    // this.spinnerService.show('general-information');    

    this.devprint.log('body', this.body)
    this.devprint.log('patchBody', patchBody)

    this._initiativesService.patchSummary(patchBody, this._initiativesService.initiative.id, this.stageId).subscribe(generalResp => {
      this._interactionsService.successMessage('General information has been saved');
      this.validateBudget() && this._dataValidatorsService.wordCounterIsCorrect(this.body.generalInformation.name, 50) && ((this.body.generalInformation.first_name && this.body.generalInformation.co_first_name)?true:false)
      ?this._interactionsService.successMessage('General information has been saved')
      :this._interactionsService.warningMessage('General information has been saved, but there are incomplete fields');
      this._dataControlService.generalInfoChange$.emit();
    },error => {
    // console.log(error, this.errorService.getServerMessage(error))
    this.spinnerService.hide('general-information');
    console.log(error);
    },
    ()=>{
      this.spinnerService.hide('general-information');

    });
  }

  saveGeneralInformation(patchBody){
    console.log(patchBody);
    this._initiativesService.patchGeneralInformation( this._initiativesService.initiative.id, this._dataControlService.getStageRouteByStageId(this.stageId).ownPath, patchBody ).subscribe(resp=>{
      console.log(resp);
      this._dataControlService.generalInfoChange$.emit();
      this._dataValidatorsService.wordCounterIsCorrect(this.body.generalInformation.name, 50) && ((this.body.generalInformation.first_name && this.body.generalInformation.co_first_name)?true:false)
      ?this._interactionsService.successMessage('General information has been saved')
      :this._interactionsService.warningMessage('General information has been saved, but there are incomplete fields');
    });
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(ManageAccessComponent, {
      width: '100%',
      height: '90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSummary();
    });
  }

  setExpandWithUserId(type) {
    switch (type) {
      case 'Co-Lead':
        this._interactionsService.expandWithUserId = this.body.generalInformation.co_lead_id;

        break;

      case 'Lead':
        this._interactionsService.expandWithUserId = this.body.generalInformation.lead_id;
        break;

      default:
        break;
    }
  }

}
