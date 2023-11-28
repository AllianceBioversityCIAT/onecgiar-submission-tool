import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { managementPlan } from './models/management-plan.interface';
import { Risk } from './models/risk.interface';
import { Router } from '@angular/router';
import { Riskassessment } from './models/riskassessment.interface';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss']
})
export class RiskAssessmentComponent implements OnInit {
  stepNumber = 0;
  riskListIsLoaded = false;
  riskThemesList = [];
  managementPlan: managementPlan={
    id:null,
    active: true,
    section: "risk_assessment",
    updateFiles: []
  };

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
    this._initiativesService.setTitle('Risk assessment');
    this.getManagePlan();
    this.getRisksList();
    this.getRisksTheme();
  }

  removeElementOfTopFiveInStepOne(item){
    item.selected = false;
  }

  getRisksTheme(){
    this._initiativesService.getRisksTheme().subscribe(resp=>{
      this.riskThemesList = resp.response.risksTheme
    })
  }

  getRisksList(){
    this._initiativesService.getRisksList().subscribe(resp=>{
      let response:Risk[] = resp.response.risks;
      // console.log(response);
      response.map((res:any)=>{
        res.risks_achieving_impact = res.generic_risks
        res.risk_id = res.id;
        res.id = null;
      })
      this.risksList = response;
      this.riskListIsLoaded = true;

    })
  }

  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/${this._initiativesService.initiative.exactStageName}/mpara/management-plan`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
    // console.log("Reload");
  }

  getManagePlan() {
    this._initiativesService.getManagePlan('risk_assessment').subscribe(resp => {
      // console.log(resp)
      let response: managementPlan = resp.response.managePlanData;
      // console.log(response)
      if (response) this.managementPlan = response;
      if (!response?.riskassessment?.length) this.managementPlan.riskassessment = []
      const completeArray = ()=>{
        if (this.managementPlan.riskassessment?.length >= 5 || !Array.isArray(this.managementPlan.riskassessment)) return;
        this.managementPlan.riskassessment.push(
          {
            active:true,
            id:null,
            risks_achieving_impact:'',
            selected: true,
            editable: true,
            risks_theme: '',
            add_by_user: false,
            risks_theme_created:'',
            risks_achieving_impact_created:''
          }
        )
        return completeArray();
      }
      completeArray();
      
      this.showForm = true;
    },
      err => { console.log(err);this.showForm = true; }
      , () => {
        this.showForm = true;
      })
  }

  calculateRiskScore(){
    if(!this.risksList.length)return;
    this.managementPlan.riskassessment.map((riskAssessment:Riskassessment)=>{
      riskAssessment.risk_score = riskAssessment.likelihood * riskAssessment.impact
      if (!riskAssessment.add_by_user) return;
      if(riskAssessment.risks_achieving_impact_created) riskAssessment.risks_achieving_impact = riskAssessment.risks_achieving_impact_created;
      if (riskAssessment.risks_theme_created) riskAssessment.risks_theme = riskAssessment.risks_theme_created;
      riskAssessment.risk_id = null;
    })
  }

  saveSection() {
    console.log("saveSection")
    let formData = new FormData();
    this.calculateRiskScore();
    formData.append('data', JSON.stringify(this.managementPlan));
    console.log(this.managementPlan)
    this._initiativesService.saveManagePlan(formData,'7.management-plan').subscribe(resp => {

      this.getManagePlan();
      this.managementPlan.riskassessment.length ?
        this._interactionsService.successMessage('Risk assessment plan has been saved') :
        this._interactionsService.warningMessage('Risk assessment plan has been saved, but there are incomplete fields')
    })

  }

  addIdxToSelected(riskassessment: Riskassessment[]) {
    let index = 0;
    riskassessment.map((item: Riskassessment) => {
      if (item.selected === false) return;
      index++;
      item.idx = index
    })
    return riskassessment;
  }


}
