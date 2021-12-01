import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-opportunity-item',
  templateUrl: './opportunity-item.component.html',
  styleUrls: ['./opportunity-item.component.scss']
})
export class OpportunityItemComponent implements OnInit {
  @Input() opportunity;
  opportunityForm:FormGroup;

  constructor(
    public _initiativesService:InitiativesService
  ) { 
    this.opportunityForm = new FormGroup({
      id:new FormControl(null),
      opportunities_description:new FormControl(null),
      risk_assessment_id:new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.getCurrentData();
    this.opportunityForm.valueChanges.subscribe(resp=>{
      // console.log("chnge");
      this.updateForm();
    })
  }

  
  getCurrentData(){
    this.opportunityForm.get("id").setValue(this.opportunity?.id)
    this.opportunityForm.get("opportunities_description").setValue(this.opportunity?.opportunities_description)
    this.opportunityForm.get("risk_assessment_id").setValue(this.opportunity?.risk_assessment_id)

  }

  removeOpportunity(){
    
  }

  updateForm(){
    this.opportunity.id = this.opportunityForm.get("id").value;
    this.opportunity.opportunities_description = this.opportunityForm.get("opportunities_description").value;
    this.opportunity.risk_assessment_id = this.opportunityForm.get("risk_assessment_id").value;
  }

}
