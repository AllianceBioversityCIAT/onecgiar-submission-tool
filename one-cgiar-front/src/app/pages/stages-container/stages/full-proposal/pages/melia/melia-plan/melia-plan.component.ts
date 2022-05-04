import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { DataValidatorsService } from '../../../../shared/data-validators.service';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

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
    this.getMeliaPlan();
    this.formChanges();
  }

  getMeliaPlan(){
    this._initiativesService.getMeliaPlan('melia').subscribe(resp=>{
      let melia = resp?.response?.melia?.meliaPlan;
      this.data.id = melia?.id ? melia?.id : null;
      this.secionForm.controls['example'].setValue(melia?.melia_plan);
    },
    err=>{console.log(err);}
    ,()=>{
      this.showForm = true;
    })
  }
  saveSection(){

    this.data.melia_plan = this.secionForm.get("example").value;
   

    let body = { melia_plan: this.data };
    console.log(body);

    this._initiativesService.saveMeliaPlan(body).subscribe(resp=>{
      console.log("saveMeliaPlan");
      console.log(resp);
      this.getMeliaPlan();
      this.secionForm.valid && this.extraValidation?
      this._interactionsService.successMessage('Melia plan has been saved'):
      this._interactionsService.warningMessage('Melia plan has been saved, but there are incomplete fields')
    })

    
  }

  formChanges(){
    this.secionForm.valueChanges.subscribe(resp=>{
      this.extraValidation = this._dataValidatorsService.wordCounterIsCorrect(this.secionForm.get("example").value, 500);
    })
  }

}
