import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../shared/data-validators.service';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';
import { AttributesListConfiguration } from '../../../../../../shared/components/compact-information-table-view/CompactInformationTableView.interface';

@Component({
  selector: 'app-innovation-packages-and-srp',
  templateUrl: './innovation-packages-and-srp.component.html',
  styleUrls: ['./innovation-packages-and-srp.component.scss']
})
export class InnovationPackagesAndSrpComponent implements OnInit {
  secionForm: FormGroup;
  showForm = false;
  extraValidation = false;
  configAtribute:AttributesListConfiguration[] = [
      {
        attribute: 'year1',
        name: 'Year 1',
      },
      {
        attribute: 'year2',
        name: 'Year 2',
      },
      {
        attribute: 'year3',
        name: 'Year 3',
      }
    ];
  body = {};
  configIndex = {
      "LT":'Light Track',
      "ST":'Standard Track',
      "AT":'Advance Track'
}
  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService
  ) {
    this.secionForm = new FormGroup({
      id: new FormControl(null),
      key_principles: new FormControl(null,Validators.required),
    });
   }

  ngOnInit(): void {
    this.getInnovationPackages()
    this.formChanges();
    this.getTracks();
  }
  getInnovationPackages(){
    this._initiativesService.getInnovationPackages().subscribe(resp=>{
      if (resp.response.innovationPackagesData) {
        this.secionForm.controls['key_principles'].setValue(resp.response.innovationPackagesData.key_principles);
        this.secionForm.controls['id'].setValue(resp.response.innovationPackagesData.id);
      }
      this.showForm = true
    })
  }

  saveSection(){
    this._initiativesService.saveInnovationPackages(this.secionForm.value).subscribe(resp=>{
      this.secionForm.controls['id'].setValue(resp.response.innovationPackages.upsertedInnovationPackages.id);
      this.secionForm.valid && this.extraValidation?
      this._interactionsService.successMessage('Innovation Packages and Scaling Readiness Plan has been saved'):
      this._interactionsService.warningMessage('Innovation Packages and Scaling Readiness Plan has been saved, but there are incomplete fields')
    })
    this.updateTracks();
  }

  formChanges(){
    this.secionForm.valueChanges.subscribe(resp=>{
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.secionForm.get("key_principles").value, 250);
    })
  }

  getTracks(){
    this._initiativesService.getTracksByInitiativeAndStageId().subscribe(({response}) => {
      this.body = response;
      for (const key in this.body['tracksByInitiative']) {
        for (const year in this.body['tracksByInitiative'][key]) {
          if(!this.body['tracksByInitiative'][key][year]?.value){
            this.body['tracksByInitiative'][key][year].value = 0;
            this.body['tracksByInitiative'][key][year].id = null;
          }
        }
      }
    })
  }

  updateTracks(){
    this._initiativesService.patchTracksByInitiativeAndStageId(this.body['tracksByInitiative']).subscribe(res => {
      /** */
    });
  }

}
