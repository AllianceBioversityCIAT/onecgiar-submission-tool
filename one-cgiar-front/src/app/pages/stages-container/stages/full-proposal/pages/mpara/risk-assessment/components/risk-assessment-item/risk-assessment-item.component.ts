import { Component, Input, OnInit } from '@angular/core';
import { Riskassessment } from '../../models/riskassessment.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';
import { Opportunity } from '../../models/opportunity.interface';

@Component({
  selector: 'app-risk-assessment-item',
  templateUrl: './risk-assessment-item.component.html',
  styleUrls: ['./risk-assessment-item.component.scss']
})
export class RiskAssessmentItemComponent implements OnInit {
  @Input() riskAssessment:Riskassessment;
  @Input() managementPlan:any;
  @Input() risksList:any;
  riskTitleEditableIsActive = false;
  selectList = null;
  riskAssessmentForm:FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) { 
    this.riskAssessmentForm = new FormGroup({
      id:new FormControl(null),
      // risks_achieving_impact:new FormControl( null),
      description_risk:new FormControl( null),
      risk_id:new FormControl( null),
      // likelihood:new FormControl(null),
      impact:new FormControl(null),
      risk_score:new FormControl( null),
      active:new FormControl(true),
      manage_plan_risk_id:new FormControl(null),
      // opportinities: new FormControl([])
    });
  }

  ngOnInit(): void {
    this.getCurrentData();
    this.riskAssessmentForm.valueChanges.subscribe(resp=>{
      // console.log("chnge");
      this.updateForm();
    })
    if ((!this.riskAssessment.risks_achieving_impact && !this.riskAssessment.risks_achieving_impact_created)) this.riskTitleEditableIsActive = true;
  }

  activeRiskTitleEditable(){
    console.log("activeRiskTitleEditable");
    this.riskTitleEditableIsActive = true;
  }

  AddOpportunity(){
    let body:Opportunity={
      id:null,
      risk_assessment_id:null,
      opportunities_description:null,
    }
    this.riskAssessment.opportinities.push(body);
  }

  getCurrentData(){
    this.riskAssessmentForm.get("id").setValue(this.riskAssessment?.id)
    // this.riskAssessmentForm.get("risks_achieving_impact").setValue(this.riskAssessment?.risks_achieving_impact)
    this.riskAssessmentForm.get("description_risk").setValue(this.riskAssessment?.description_risk)
    // this.riskAssessmentForm.get("likelihood").setValue(this.riskAssessment?.likelihood)
    this.riskAssessmentForm.get("impact").setValue(this.riskAssessment?.impact)
    this.riskAssessmentForm.get("risk_score").setValue(this.riskAssessment?.risk_score)
    this.riskAssessmentForm.get("manage_plan_risk_id").setValue(this.riskAssessment?.manage_plan_risk_id)

  }

  mapTheme(e){
    console.log("as")
    console.log(e)
    console.log(this.riskAssessment)
    this.riskAssessment.risks_theme = e.risks_theme;
  }

  updateForm(){
    // this.riskAssessment = this.riskAssessmentForm.value;
    // this.riskAssessment.risks_achieving_impact = this.riskAssessmentForm.get("risks_achieving_impact").value;
    this.riskAssessment.description_risk = this.riskAssessmentForm.get("description_risk").value;
    // this.riskAssessment.likelihood = this.riskAssessmentForm.get("likelihood").value || 0;
    this.riskAssessment.impact = this.riskAssessmentForm.get("impact").value || 0;
    this.riskAssessment.risk_score = this.riskAssessmentForm.get("risk_score").value || 0;
    // console.log(this.riskAssessment);
    // console.log(this.all);
  }

}
