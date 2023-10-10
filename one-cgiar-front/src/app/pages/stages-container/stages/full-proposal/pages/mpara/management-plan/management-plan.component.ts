import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { environment } from '../../../../../../../../environments/environment';
import { DataValidatorsService } from '../../../../shared/data-validators.service';

@Component({
  selector: 'app-management-plan',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss']
})
export class ManagementPlanComponent implements OnInit {
  templatesUrlBase = environment.templatesUrlBase;
  managementPlanForm: FormGroup;
  showForm = false;
  extraValidation = false;
  data = {
    id : null,
    management_plan : "",
    active : true,
    section : "management-plan",
    updateFiles : []
  };

  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService
  ) { 
    this.managementPlanForm = new FormGroup({
      example: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Management plan');
    this.getManagePlan();
    this.formChanges();
  }

  getManagePlan(){
    this._initiativesService.getManagePlan('management-plan').subscribe(resp=>{
      // console.log(resp);
      let mpara = resp.response.managePlanData;
      this.data.id = mpara?.id;
      // console.log(mpara);
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
    this._initiativesService.saveManagePlan(formData,'7.management-plan').subscribe(resp=>{
      console.log("management-plan");
      console.log(resp);
      this.getManagePlan();
      this.managementPlanForm.valid && this.extraValidation?
      this._interactionsService.successMessage('Management plan has been saved'):
      this._interactionsService.warningMessage('Management plan has been saved, but there are incomplete fields')
    })

    
  }

  formChanges(){
    this.managementPlanForm.valueChanges.subscribe(resp=>{
      console.log("changes");
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.managementPlanForm.get("example").value, 250);
    })
  }

}
