import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
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

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  @Input() stageName = '';
  public generalInformationForm: FormGroup;
  public initvStgId: any;
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
    this.generalInformationForm = new FormGroup({
      conceptId: new FormControl(''),
      name: new FormControl(null, Validators.required),
      action_area_description: new FormControl(''),
      action_area_id: new FormControl(null, Validators.required),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }



  ngOnInit(): void {
    this._dataControlService.generalInfoChange$.subscribe(resp=>{
      this.getConceptGeneralInfo(this.conceptSvc.initvStgId);
    })
    this.conceptSvc.initvStgId = this._initiativesService.initvStgId;
    this.generalInformationForm.get('initvStgId').setValue(this._initiativesService.initvStgId)
    // this.getConceptGeneralInfo(this.conceptSvc.initvStgId);
    this._dataControlService.generalInfoChange$.emit();
  }

  validateFormAndLeads(){
    ((this.leads.lead_name && this.leads.co_lead_name)?true:false)
    if (this.generalInformationForm.status == 'VALID' &&  ((this.leads.lead_name && this.leads.co_lead_name)?true:false)==true) {
      return  'VALID';
    } else{
      return  'INVALID'
    }
  }

  getConceptGeneralInfo(initvStgId) {
    this.initvStgId = this.conceptSvc.initvStgId;
    this.spinnerService.show('general-information');

    
    this.conceptSvc.getActionAreas().subscribe(resp=>{
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


      this._initiativesService.getGeneralInformation(this._initiativesService.initiative.id,this.stageName).subscribe(resp=>{


      let general_information_data = resp.response.generalInformation;
      console.log(general_information_data);
      this.leads.lead_name = general_information_data.first_name;
      this.leads.lead_email = general_information_data.email;
      this.leads.lead_id = general_information_data.lead_id;
      this.leads.co_lead_name = general_information_data.co_first_name;
      this.leads.co_lead_email = general_information_data.co_email;
      this.leads.co_lead_id = general_information_data.co_lead_id;

      this.generalInformationForm.controls['name'].setValue(general_information_data.name);
      // this.generalInformationForm.controls['conceptId'].setValue(gnrlInfo.conceptId);

      this.generalInformationForm.controls['action_area_id'].setValue(general_information_data.action_area_id);
      this.generalInformationForm.controls['action_area_description'].setValue(general_information_data.action_area_description);

      this.showForm = true;
    }, err => {
      console.log(err instanceof HttpErrorResponse);
      this.errorService.handleError(err);
      // this.spinnerService.hide('general-information');
      this.showForm = true;
    });
  }

  upsertGeneralInfo() {
    this.spinnerService.show('general-information');
    this.conceptSvc.upsertGeneralInformation(this.generalInformationForm.value).
      subscribe(
        gnrlInfo => {
          this.spinnerService.hide('general-information');


          this._initiativesService.getGreenCheckStatus(this._initiativesService.initvStgId).subscribe(resp=>{
            this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this._initiativesService.initvStgId);
          })

          this.generalInformationForm.valid && ((this.leads.lead_name && this.leads.co_lead_name)?true:false)?  this._interactionsService.successMessage('General information has been saved'):
                      this._interactionsService.warningMessage('General information has been saved, but there are incomplete fields')
        },
        error => {
          // console.log(error, this.errorService.getServerMessage(error))
          this.spinnerService.hide('general-information');
        }
      )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManageAccessComponent, {
      width: '100%',
      height: '90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this._dataControlService.generalInfoChange$.emit();
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
