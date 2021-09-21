import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';

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

  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService
  ) { 
    this.secionForm = new FormGroup({
      example: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getHumanResources();
  }

  getHumanResources(){
    this._initiativesService.getHumanResources(this._initiativesService.initiative.id,'gender').subscribe(resp=>{
      console.log(resp);
      let respData = resp.response.humanResourcesData;
      this.data.id = respData?.id;
      console.log(respData);
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
    this._initiativesService.saveHumanResources(formData,this._initiativesService.initiative.id,'9.human-resources',3).subscribe(resp=>{
      console.log("Human resources");
      console.log(resp);
      this.getHumanResources();
      this.secionForm.valid?
      this._interactionsService.successMessage('Human resources has been saved'):
      this._interactionsService.warningMessage('Human resources  has been saved, but there are incomplete fields')
    })

    
  }

}