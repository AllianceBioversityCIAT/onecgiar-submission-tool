import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-open-and-fair-data-assets',
  templateUrl: './open-and-fair-data-assets.component.html',
  styleUrls: ['./open-and-fair-data-assets.component.scss']
})
export class OpenAndFairDataAssetsComponent implements OnInit {
  sectionForm: FormGroup;
  showForm = false;
  constructor(
   public _initiativesService:InitiativesService,
   private _interactionsService:InteractionsService
  ) {
    this.sectionForm = new FormGroup({
      open_fair_data_policy:new FormControl(null),
      open_fair_data_details:new FormControl(null),
      id:new FormControl(null),
    });
   }

  ngOnInit(): void {
    this.getPolicyCompliance();
  }

  saveSection(){
    // console.log(this.sectionForm.value);
    this._initiativesService.savePolicyCompliance(this.sectionForm.value,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.sectionForm.controls['id'].setValue(resp.response.policyComplianceOversight.upsertedPolicyCompliance.id);
      this.sectionForm.valid?
      this._interactionsService.successMessage('Open and FAIR data assets has been saved'):
      this._interactionsService.warningMessage('Open and FAIR data assets has been saved, but there are incomplete fields')
    })
  }

  getPolicyCompliance(){
    this._initiativesService.getPolicyCompliance(this._initiativesService.initiative.id).subscribe(resp=>{
      let response = resp.response.policyComplianceData
      // console.log(response);
      if (resp.response.policyComplianceData) {
        this.sectionForm.controls['open_fair_data_policy'].setValue(response.open_fair_data_policy);
        this.sectionForm.controls['open_fair_data_details'].setValue(response.open_fair_data_details);
        this.sectionForm.controls['id'].setValue(response.id);
      }

    },err=>{

    },()=>{
      this.showForm = true;
    })
  }

}
