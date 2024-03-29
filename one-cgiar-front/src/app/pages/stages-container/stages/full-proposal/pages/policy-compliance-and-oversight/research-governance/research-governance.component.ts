import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-research-governance',
  templateUrl: './research-governance.component.html',
  styleUrls: ['./research-governance.component.scss']
})
export class ResearchGovernanceComponent implements OnInit {
  sectionForm: FormGroup;
  showForm = true;
  constructor(
   public _initiativesService:InitiativesService,
   private _interactionsService:InteractionsService,
   private _dataControlService:DataControlService
  ) {
    this.sectionForm = new FormGroup({
      research_governance_policy:new FormControl(null),
      id:new FormControl(null),
    });
   }

  ngOnInit(): void {
    this._initiativesService.setTitle('Research governance');
    this.getPolicyCompliance();
  }

  saveSection(){
    // console.log(this.sectionForm.value);
    this._initiativesService.savePolicyCompliance(this.sectionForm.value).subscribe(resp=>{
      this.sectionForm.controls['id'].setValue(resp.response.policyComplianceOversight.upsertedPolicyCompliance.id);
      this.sectionForm.valid?
      this._interactionsService.successMessage('Research governance has been saved'):
      this._interactionsService.warningMessage('Research governance has been saved, but there are incomplete fields')
    })
  }

  getPolicyCompliance(){
    this._initiativesService.getPolicyCompliance().subscribe(resp=>{
      let response = resp.response.policyComplianceData;
      // console.log(response);
      if (resp.response.policyComplianceData) {
        this.sectionForm.controls['research_governance_policy'].setValue(response.research_governance_policy);
        this.sectionForm.controls['id'].setValue(response.id);
      }

    },err=>{

    },()=>{
      this.showForm = true;
    })
  }

}
