import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StagesMenuService } from '@shared/services/stages-menu.service';
import { ConceptService } from '@app/shared/services/concept.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '@app/shared/services/error.service';
import Swal from 'sweetalert2';
import { InteractionsService } from '../../../services/interactions.service';
@Component({
  selector: 'app-general-information-concept',
  templateUrl: './general-information-concept.component.html',
  styleUrls: ['./general-information-concept.component.scss']
})
export class GeneralInformationConceptComponent implements OnInit {

  public generalInformationForm: FormGroup;
  public initvStgId: any;
  public actionAreas: [];
  // public usersByInitiative: [];
  public usersByRoles:any [];

  fName="";
  wordCount: any;


  @ViewChild("text") text: ElementRef;
  words: any;
  showForm=false;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  constructor(
    private errorService: ErrorService, 
    public stgMenuSvc: StagesMenuService, 
    public conceptSvc: ConceptService, 
    public activatedRoute: ActivatedRoute, 
    private spinnerService: NgxSpinnerService,
    private interactionsService:InteractionsService
    ) {
    this.generalInformationForm = new FormGroup({
      conceptId: new FormControl(''),
      name: new FormControl(null, Validators.required),
      lead_name: new FormControl(null),
      lead_id: new FormControl(null),
      action_area_description: new FormControl(''),
      action_area_id: new FormControl(null, Validators.required),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp => {
      this.conceptSvc.initvStgId = resp['id'];
      this.generalInformationForm.get('initvStgId').setValue(resp['id'])
      this.getConceptGeneralInfo(this.conceptSvc.initvStgId);
    });
  }

  getConceptGeneralInfo(initvStgId) {
    this.initvStgId = this.conceptSvc.initvStgId;
    this.spinnerService.show('general-information');
    Promise.all([
      this.conceptSvc.getActionAreas().toPromise(),
      this.conceptSvc.getConcept(initvStgId).toPromise(),
      this.conceptSvc.getUsersByRoles().toPromise(),
    ]).then(res => {
      
      this.actionAreas = res[0];
      let gnrlInfo = res[1];
      this.usersByRoles = res[2].data;
      for (const user of  this.usersByRoles) {
        user.firstN_lastN = user.first_name+' '+user.last_name;
      }

      this.generalInformationForm.controls['name'].setValue(gnrlInfo.conceptName);
      this.generalInformationForm.controls['conceptId'].setValue(gnrlInfo.conceptId);

      this.generalInformationForm.controls['action_area_id'].setValue(gnrlInfo.conceptActAreaId);
      this.generalInformationForm.controls['action_area_description'].setValue(gnrlInfo.conceptActAreaDes);

      this.generalInformationForm.controls['lead_id'].setValue(gnrlInfo.conceptLeadId);
      this.generalInformationForm.controls['lead_name'].setValue(gnrlInfo.conceptLead);
      this.spinnerService.hide('general-information');
      this.showForm=true;
    });
    this.generalInformationForm.valueChanges.subscribe(
      result => {
        this.stgMenuSvc.setFormStageStatus('concept', 'general_information', this.generalInformationForm.status, initvStgId)
        // this.stgMenuSvc.conceptFormStatus('concept', 'general_information', this.generalInformationForm.status)
      }
    );

  }


  upsertGeneralInfo() {
    this.spinnerService.show('general-information');
    this.conceptSvc.upsertGeneralInformation(this.generalInformationForm.value).
      subscribe(
        gnrlInfo => {
          this.spinnerService.hide('general-information');
          this.interactionsService.successMessage('General information has been saved')
        },
        error => {
          // console.log(error, this.errorService.getServerMessage(error))
          this.spinnerService.hide('general-information');
        }
      )
  }
}