import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';

@Component({
  selector: 'app-capacity-development',
  templateUrl: './capacity-development.component.html',
  styleUrls: ['./capacity-development.component.scss']
})
export class CapacityDevelopmentComponent implements OnInit {
  secionForm: FormGroup;
  showForm = false;
  data = {
    id : null,
    capacity_development : "",
    active : true,
    section : "gender",
    updateFiles : []
  };
  extraValidation = false;
  
  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService,
    private _dataValidatorsService:DataValidatorsService
  ) { 
    this.secionForm = new FormGroup({
      example: new FormControl(null,Validators.required),
    });
  }

  ngOnInit(): void {
    this._initiativesService.setTitle('Capacity Development');
    this.getHumanResources();
    this.formChanges();
  }

  getHumanResources(){
    this._initiativesService.getHumanResources('gender').subscribe(resp=>{
      //console.log(resp);
      let respData = resp.response.humanResourcesData;
      this.data.id = respData?.id;
      //console.log(respData);
      this.secionForm.controls['example'].setValue(respData?.capacity_development);
    },
    err=>{console.log(err);}
    ,()=>{
      this.showForm = true;
    })
  }
  saveSection(){

    const formData = new FormData();

    this.data.capacity_development = this.secionForm.get("example").value;

    this.data.id = this.data.id == undefined ? null : this.data.id;

    formData.append('data', JSON.stringify(this.data));
    this._initiativesService.saveHumanResources(formData,'9.human-resources').subscribe(resp=>{
      //console.log("Human resources");
      //console.log(resp);
      this.getHumanResources();
      this.secionForm.valid && this.extraValidation?
      this._interactionsService.successMessage('Human resources has been saved'):
      this._interactionsService.warningMessage('Human resources  has been saved, but there are incomplete fields')
    })

    
  }

  formChanges(){
    this.secionForm.valueChanges.subscribe(resp=>{
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.secionForm.get("example").value);
    })
  }


}
