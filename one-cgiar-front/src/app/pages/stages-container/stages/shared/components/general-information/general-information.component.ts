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

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  @Input() stageName = '';
  public summaryForm: FormGroup;
  public actionAreas: any[];

  fName = "";
  wordCount: any;
  leads = {
    lead_name: null,
    lead_email: null,
    lead_id: -1,
    co_lead_name: '',
    co_lead_email: '',
    co_lead_id: -1
  }

  @ViewChild("text") text: ElementRef;
  words: any;
  showForm = false;
  showFormActionArea = false;
  regionsList = [];
  countriesList = [];

  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(
    private errorService: AppErrorHandler,
    public conceptSvc: ConceptService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService: InteractionsService,
    public dialog: MatDialog,
    public _initiativesService: InitiativesService,
    private router: Router,
    public _dataControlService: DataControlService,
    private _StagesMenuService: StagesMenuService,
    public _dataValidatorsService : DataValidatorsService
  ) {
    this.summaryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      action_area_description: new FormControl(''),
      action_area_id: new FormControl(null, Validators.required),
      generalInformationId: new FormControl(null, Validators.required),
      budget_value: new FormControl(0, [Validators.required,Validators.min(1)]),
      table_name: new FormControl("general_information"),
      col_name: new FormControl("budget"),
      active: new FormControl(true),
      budgetId: new FormControl(null),
      is_global: new FormControl(true),
    });

  }

  localEmitter: any;


  ngOnInit(): void {

    this.budgetCol?.valueChanges.subscribe(budget => {
      if (budget < 0) {
        this.budgetCol.setValue(0)
        this.budgetCol.setErrors({ 'invalid': true });
        //  console.log(this.budgetCol.invalid)/
      }
    })
    this.localEmitter = this._dataControlService.generalInfoChange$.subscribe(resp => {
      this.getSummary();
    })
    this._dataControlService.generalInfoChange$.emit();
  }

  ngOnDestroy(): void {
    this.localEmitter.unsubscribe()
  }

  get budgetCol() {
    return this.summaryForm.get('budget_value') as FormControl;
  }

  validateFormAndLeads() {
    ((this.leads.lead_name && this.leads.co_lead_name) ? true : false)
    if (this.summaryForm.status == 'VALID' && ((this.leads.lead_name && this.leads.co_lead_name) ? true : false) == true) {
      return 'VALID';
    } else {
      return 'INVALID'
    }
  }

  getSummary() {
    this.spinnerService.show('general-information');

    this._initiativesService.getSummary(this._initiativesService.initiative.id, this.stageName == 'proposal' ? 3 : 2).subscribe(resp => {

      console.log(resp.response.geoScope);
      this.regionsList = resp?.response?.geoScope?.regions;
      this.countriesList = resp?.response?.geoScope?.countries;
      // get general information leads
      let general_information_data = resp.response.generalInformation;
      this.leads.lead_name = general_information_data.first_name;
      this.leads.lead_email = general_information_data.email;
      this.leads.lead_id = general_information_data.lead_id;
      this.leads.co_lead_name = general_information_data.co_first_name;
      this.leads.co_lead_email = general_information_data.co_email;
      this.leads.co_lead_id = general_information_data.co_lead_id;
      //general information fields
      this.summaryForm.controls['name'].setValue(general_information_data.name);
      this.summaryForm.controls['action_area_id'].setValue(general_information_data.action_area_id);
      this.summaryForm.controls['action_area_description'].setValue(general_information_data.action_area_description);
      this.summaryForm.controls['generalInformationId'].setValue(general_information_data.generalInformationId);
      // get budget
      let budget_data = resp.response.budget;
      this.summaryForm.controls['budgetId'].setValue(budget_data.id);
      this.summaryForm.controls['budget_value'].setValue(budget_data.value);
      // get Geo
      let geo_data = resp.response.geoScope;
      this.summaryForm.controls['is_global'].setValue(geo_data.goblalDimension);

      this.showForm = true;
    },
      err => {
        console.log(err);
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
      this.showFormActionArea = true;
    },
      err => {
        console.log(err);
        this.showFormActionArea = true;
      })


  }

  upsertGeneralInfo() {

    console.log(this.summaryForm);

    this.spinnerService.show('general-information');
    let body = this.summaryForm.value;

    if (!(body.budget_value) || (body.budget_value == "")) body.budget_value = 0;
    console.log(body)
    this._initiativesService.patchSummary(body,this._initiativesService.initiative.id,this.stageName=='proposal'?3:2).subscribe(generalResp => {
      this.summaryForm.controls['generalInformationId'].setValue(generalResp.response.generalInformation.generalInformationId);
      this.summaryForm.controls['budgetId'].setValue(generalResp.response.budget.id);
      // this._interactionsService.successMessage('General information has been saved');

      this.summaryForm.valid && this._dataValidatorsService.wordCounterIsCorrect(this.summaryForm.get("name").value, 50) && ((this.leads.lead_name && this.leads.co_lead_name)?true:false)
      ?this._interactionsService.successMessage('General information has been saved')
      :this._interactionsService.warningMessage('General information has been saved, but there are incomplete fields')


      


    },error => {
    // console.log(error, this.errorService.getServerMessage(error))
    console.log(error);
    },
    ()=>{
      this.spinnerService.hide('general-information');

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
        this._interactionsService.expandWithUserId = this.leads.co_lead_id;

        break;

      case 'Lead':
        this._interactionsService.expandWithUserId = this.leads.lead_id;
        break;

      default:
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        console.log(propName)
      }
    }
  }

}
