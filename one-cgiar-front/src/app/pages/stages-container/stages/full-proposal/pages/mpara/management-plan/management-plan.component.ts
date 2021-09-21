import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-management-plan',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss']
})
export class ManagementPlanComponent implements OnInit {
  managementPlanForm: FormGroup;
  showForm = false;
  data = {
    id : null,
    management_plan : "",
    active : true,
    section : "management-plan",
    updateFiles : []
  };

  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService
  ) { 
    this.managementPlanForm = new FormGroup({
      example: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getManagePlan();
  }

  getManagePlan(){
    this._initiativesService.getManagePlan(this._initiativesService.initiative.id,'management-plan').subscribe(resp=>{
      console.log(resp);
      let mpara = resp.response.managePlanData;
      this.data.id = mpara?.id;
      console.log(mpara);
      this.managementPlanForm.controls['example'].setValue(mpara?.management_plan);
    },
    err=>{console.log(err);}
    ,()=>{
      this.showForm = true;
    })
  }
  saveSection(){

    const formData = new FormData();

    this.data.management_plan = this.managementPlanForm.get("example").value;

    this.data.id = this.data.id == undefined ? null : this.data.id;

    formData.append('data', JSON.stringify(this.data));
    this._initiativesService.saveManagePlan(formData,this._initiativesService.initiative.id,'7.management-plan',3).subscribe(resp=>{
      console.log("management-plan");
      console.log(resp);
      this.getManagePlan();
      this.managementPlanForm.valid?
      this._interactionsService.successMessage('Management plan has been saved'):
      this._interactionsService.warningMessage('Management plan has been saved, but there are incomplete fields')
    })

    
  }




}
