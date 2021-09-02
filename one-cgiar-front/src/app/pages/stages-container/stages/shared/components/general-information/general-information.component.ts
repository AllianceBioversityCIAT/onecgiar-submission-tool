import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter  } from '@angular/core';
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
import { ManageAccessComponent } from '../../../../../../shared/components/manage-access/manage-access.component';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  @Input() stageName = '';
  public summaryForm: FormGroup;
  public actionAreas: any[];
  // public usersByInitiative: [];

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
  geographicScope = {
    regions : [],
    countries : []
  }

 
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
    public _initiativesService:InitiativesService,
    private router:Router, 
    public _dataControlService:DataControlService,
    private _StagesMenuService:StagesMenuService
    ) {
    this.summaryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      action_area_description: new FormControl(''),
      action_area_id: new FormControl(null, Validators.required),
      generalInformationId: new FormControl(null, Validators.required),
      budget_value: new FormControl(0),
      table_name: new FormControl("general_information"),
      col_name: new FormControl("budget"),
      active: new FormControl(true),
      budgetId: new FormControl(null),
      is_global: new FormControl(true),
    });

  }

  localEmitter: any;


  ngOnInit(): void {
    this.localEmitter= this._dataControlService.generalInfoChange$.subscribe(resp=>{
        this.getSummary();
    })
    this._dataControlService.generalInfoChange$.emit();
  }

  ngOnDestroy(): void {
    this.localEmitter.unsubscribe()
  }

  validateFormAndLeads(){
    ((this.leads.lead_name && this.leads.co_lead_name)?true:false)
    if (this.summaryForm.status == 'VALID' &&  ((this.leads.lead_name && this.leads.co_lead_name)?true:false)==true) {
      return  'VALID';
    } else{
      return  'INVALID'
    }
  }

  getSummary() {
    this.spinnerService.show('general-information');
    this._initiativesService.getSummary(this._initiativesService.initiative.id,this.stageName=='proposal'?3:2).subscribe(resp=>{
      // console.log(resp);
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
      this.geographicScope.regions = geo_data.regions;
      this.geographicScope.countries = geo_data.countries;
      this.summaryForm.controls['is_global'].setValue(geo_data.goblalDimension);


      this._initiativesService.getCLARISARegions('').subscribe(regions=>{
        this.geographicScope.regions.map(mapReg=>{
          regions.response.regions.forEach(regionItem=>{
            if (regionItem.um49Code == mapReg.region_id) mapReg.name = regionItem.name;
          })
        })
        this._dataControlService.showRegions = true;
      })

      this._initiativesService.getCLARISACountries().subscribe(countries=>{       
        this.geographicScope.countries.map(mapCoun=>{
          countries.response.countries.forEach(countryItem=>{
            if (countryItem.code == mapCoun.country_id) mapCoun.name = countryItem.name;
          })
          
        })
        this._dataControlService.showCountries = true;
      })
      
      this.showForm = true;

    },
    err=>{
      console.log(err);
    })


    this.conceptSvc.getActionAreas().subscribe(resp=>{
      // console.log(resp);
      this.actionAreas = resp;
      for (let index = 0; index < this.actionAreas.length; index++) {
        this.actionAreas[index].index_name = `Action area ${index + 1} - ${this.actionAreas[index].name}`;
      }
      this.spinnerService.hide('general-information');
      this.showFormActionArea = true;
    },
    err=>{
      this.spinnerService.hide('general-information');
      this.showFormActionArea = true;
    })


  }

  upsertGeneralInfo() {
    
    this.spinnerService.show('general-information');

    this.geographicScope.regions.map(newRegId=>{
      if (newRegId.um49Code) {
        newRegId.region_id = newRegId.um49Code;
      }
    })

    this.geographicScope.countries.map(newCountId=>{
      if (newCountId.code) {
        newCountId.country_id = newCountId.code;
      }
    })
    let body = this.summaryForm.value;
    body.regions=this.geographicScope.regions;
    body.countries=this.geographicScope.countries;
    console.log(this.geographicScope);
    // console.log(this.summaryForm.value);
    // console.log(this._initiativesService.initiative.id);
    // console.log(this.stageName=='proposal'?3:2);
    
    if (!(body.budget_value) || (body.budget_value == "")) body.budget_value = 0;
    console.log(body);
    this._initiativesService.patchSummary(body,this._initiativesService.initiative.id,this.stageName=='proposal'?3:2).subscribe(generalResp => {
      console.log(generalResp);
      this.spinnerService.hide('general-information');
      // this._initiativesService.getGreenCheckStatus(this._initiativesService.initvStgId).subscribe(resp=>{
      //   this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this._initiativesService.initvStgId);
      // })
      this._interactionsService.successMessage('General information has been saved');
      this.summaryForm.valid && ((this.leads.lead_name && this.leads.co_lead_name)?true:false)
      ?this._interactionsService.successMessage('General information has been saved')
      :this._interactionsService.warningMessage('General information has been saved, but there are incomplete fields')

    },error => {
    // console.log(error, this.errorService.getServerMessage(error))
    this.spinnerService.hide('general-information');
    });
    // console.log('%cregions','background: #222; color: #84c3fd');
    // console.log(this.geographicScope.regions);
    // console.log('%ccountries','background: #222; color: #fd8484');
    // console.log(this.geographicScope.countries);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManageAccessComponent, {
      width: '100%',
      height: '90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSummary();
      // let currentUrl = this.router.url;
      // this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
      //     this.router.navigate([currentUrl]);
      // });
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

}
