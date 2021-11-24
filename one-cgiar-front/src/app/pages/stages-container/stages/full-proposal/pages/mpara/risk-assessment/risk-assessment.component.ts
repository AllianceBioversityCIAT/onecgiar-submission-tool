import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { environment } from '../../../../../../../../environments/environment';
import { managementPlan } from './models/management-plan.interface';
import { Risk } from './models/risk.interface';
import { Router } from '@angular/router';
import { Riskassessment } from './models/riskassessment.interface';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss']
})
export class RiskAssessmentComponent implements OnInit {
  stepNumber = 0;
  riskListIsLoaded = false;
  managementPlan: managementPlan={
    id:null,
    active: true,
    section: "risk_assessment",
    updateFiles: []
  };
  //   {
//     "id": null,
//     "management_plan": "new plan",
//     "active": true,
//     "section": "management_plan",
//     "updateFiles": [],
//     "riskassessment": [
//         {
//             "id": null,
//             "risks_achieving_impact": "TEST TEST TEST",
//             "description_risk": "TEST TEST",
//             "likelihood": 5,
//             "impact": 1,
//             "risk_score": 4,
//             "active": true,
//             "manage_plan_risk_id": null,
//             "opportinities": [
//                 {
//                     "id": null,
//                     "opportunities_description": "s",
//                     "risk_assessment_id": 1
//                 }
//             ]
//         }
//     ]
// }
  risksList:Risk[]=[];
  showForm = false;
  riskDataLoaded = false;
  constructor(
    public _initiativesService: InitiativesService,
    private _interactionsService: InteractionsService,
    public _dataControlService: DataControlService,
    public _dataValidatorsService: DataValidatorsService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.getManagePlan();
    this.getRisksList();
  }

  removeElementOfTopFiveInStepOne(item){
    item.selected = false;
  }

  getRisksList(){
    this._initiativesService.getRisksList().subscribe(resp=>{
      let response:Risk[] = resp.response.risks;
      response.map((res:any)=>{
        res.risks_achieving_impact = res.generic_risks
        res.idBd = res.id;
        res.id = null;
      })
      this.risksList = response;
      this.riskListIsLoaded = true;
      console.log(response);

    })
  }

  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/mpara/management-plan`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
    console.log("Reload");
  }



  steperValidation(response){
    this.stepNumber = 1;
    if (!response) return;
    this.stepNumber = 2;
  }


  getManagePlan() {
    this._initiativesService.getManagePlan(this._initiativesService.initiative.id, 'risk_assessment').subscribe(resp => {
      let response: managementPlan = resp.response.managePlanData;
      console.log(response);
      this.steperValidation(response?.riskassessment?.length);
      console.log(response?.riskassessment?.length);
      if (response) this.managementPlan = response;
      if (!response?.riskassessment?.length) this.managementPlan.riskassessment = []
    },
      err => { console.log(err); }
      , () => {
        this.showForm = true;
      })
  }

  saveSection() {
    console.log(this.managementPlan);
    if (this.stepNumber == 1) this.managementPlan.riskassessment = this.managementPlan?.riskassessment.filter((item: any) => item.selected == true);

    let formData = new FormData();
    formData.append('data', JSON.stringify(this.managementPlan));

    this._initiativesService.saveManagePlan(formData, this._initiativesService.initiative.id, '7.management-plan', 3).subscribe(resp => {

      this.getManagePlan();
      this.managementPlan.riskassessment.length ?
        this._interactionsService.successMessage('Risk assessment plan has been saved') :
        this._interactionsService.warningMessage('Risk assessment plan has been saved, but there are incomplete fields')
    })

  }


}
