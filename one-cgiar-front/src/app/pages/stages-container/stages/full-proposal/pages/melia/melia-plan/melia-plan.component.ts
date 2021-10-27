import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';

@Component({
  selector: 'app-melia-plan',
  templateUrl: './melia-plan.component.html',
  styleUrls: ['./melia-plan.component.scss']
})
export class MeliaPlanComponent implements OnInit {
  secionForm: FormGroup;
  showForm = false;
  data = {
    id : null,
    melia_plan : "",
    active : true,
    section : "melia",
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
      example: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getMelia();
    this.formChanges();
  }

  getMelia(){
    this._initiativesService.getMelia(this._initiativesService.initiative.id,'melia').subscribe(resp=>{
      console.log(resp);
      let melia = resp.response.meliaData;
      this.data.id = melia?.id;
      console.log(melia);
      this.secionForm.controls['example'].setValue(melia?.melia_plan);
    },
    err=>{console.log(err);}
    ,()=>{
      this.showForm = true;
    })
  }
  saveSection(){

    const formData = new FormData();

    this.data.melia_plan = this.secionForm.get("example").value;

    this.data.id = this.data.id == undefined ? null : this.data.id;

    formData.append('data', JSON.stringify(this.data));
    this._initiativesService.saveMelia(formData,this._initiativesService.initiative.id,'melia',3).subscribe(resp=>{
      console.log("saveMelia");
      console.log(resp);
      this.getMelia();
      this.secionForm.valid?
      this._interactionsService.successMessage('Melia plan has been saved'):
      this._interactionsService.warningMessage('Melia plan has been saved, but there are incomplete fields')
    })

    
  }

  formChanges(){
    this.secionForm.valueChanges.subscribe(resp=>{
      console.log("changes");
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.secionForm.get("example").value, 500);
    })
  }

}
