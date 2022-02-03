import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InitiativesService } from '@shared/services/initiatives.service';
import { ConceptService } from '@shared/services/concept.service';
import { RequestsService } from '@shared/services/requests.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { InteractionsService } from '../../../services/interactions.service';


@Component({
  selector: 'app-narratives-concept',
  templateUrl: './narratives-concept.component.html',
  styleUrls: ['./narratives-concept.component.scss']
})
export class NarrativesConceptComponent implements OnInit {

  public narrativesForm: FormGroup;
  public initvStgId: any;
  showForm=false;
  localEditText=true;
  constructor(
    public stgMenuSvc: StagesMenuService, 
    public initiativesSvc: InitiativesService, 
    public conceptSvc: ConceptService, 
    private spinnerService: NgxSpinnerService,
    private interactionsService:InteractionsService,
    private _StagesMenuService:StagesMenuService
    ) {
    this.narrativesForm = new FormGroup({
      challenge: new FormControl(null, Validators.required),
      objectives: new FormControl(null, Validators.required),
      results: new FormControl(null, Validators.required),
      highlights: new FormControl(null, Validators.required),
      conceptId: new FormControl(''),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }

  ngOnInit(): void {

      this.conceptSvc.initvStgId =  this.initiativesSvc.initvStgId ;
      this.narrativesForm.get('initvStgId').setValue(this.initiativesSvc.initvStgId)
      this.getNarrative(this.conceptSvc.initvStgId);

  }

  updateNarratives() {
    this.spinnerService.show('narratives');
    this.conceptSvc.upsertNarratives(this.narrativesForm.value).subscribe(narratives => {

          this.narrativesForm.controls['challenge'].setValue(narratives.conceptChallenge);
          this.narrativesForm.controls['objectives'].setValue(narratives.conceptObjectives);
          this.narrativesForm.controls['results'].setValue(narratives.conceptResults);
          this.narrativesForm.controls['highlights'].setValue(narratives.conceptHiglights);
          this.narrativesForm.controls['conceptId'].setValue(narratives.conceptId);
          this.spinnerService.hide('narratives');
          this.narrativesForm.valid?
            this.interactionsService.successMessage('Narratives information has been saved'):
            this.interactionsService.warningMessage('Narratives information has been saved, but there are incomplete fields')
            // this.initiativesSvc.getGreenCheckStatus(this.initiativesSvc.initvStgId).subscribe(resp=>{
            //   this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this.initiativesSvc.initvStgId);
            // })

        },
        error => {
          // console.log(error, this.errorService.getServerMessage(error))
          this.spinnerService.hide('narratives');
        }
      )
  }

  getNarrative(initvStgId) {
    this.spinnerService.show('narratives');
    this.conceptSvc.getConceptNarratives(initvStgId).subscribe(resp => {

      this.narrativesForm.controls['challenge'].setValue(resp.conceptChallenge);
      this.narrativesForm.controls['objectives'].setValue(resp.conceptObjectives);
      this.narrativesForm.controls['results'].setValue(resp.conceptResults);
      this.narrativesForm.controls['highlights'].setValue(resp.conceptHiglights);
      this.narrativesForm.controls['conceptId'].setValue(resp.conceptId);
      this.spinnerService.hide('narratives');

      this.showForm=true;
    });
    // this.stgMenuSvc.menuObj.concept.narratives = this.narrativesForm.status
    // console.log(this.narrativesForm, this.stgMenuSvc.menuObj.concept)

  }

}
