import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-melia-plan',
  templateUrl: './melia-plan.component.html',
  styleUrls: ['./melia-plan.component.scss']
})
export class MeliaPlanComponent implements OnInit {
  meliaPlanForm: FormGroup;
  showForm = false;
  data = {
    meliaId : null,
    melia_plan : "algo no tan implicito",
    active : true,
    section : "melia",
    updateFiles : []
  };

  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService
  ) { 
    this.meliaPlanForm = new FormGroup({
      example: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getMelia();
  }

  getMelia(){
    this._initiativesService.getMelia(this._initiativesService.initiative.id,'melia').subscribe(resp=>{
      console.log(resp);
      let melia = resp.response.meliaData;
      this.data.meliaId = melia?.id;
      console.log(melia);
      this.meliaPlanForm.controls['example'].setValue(melia.melia_plan);
    },
    err=>{console.log(err);}
    ,()=>{
      this.showForm = true;
    })
  }
  saveSection(){

    const formData = new FormData();

    this.data.melia_plan = this.meliaPlanForm.get("example").value;

    this.data.meliaId = this.data.meliaId == undefined ? null : this.data.meliaId;

    formData.append('data', JSON.stringify(this.data));
    this._initiativesService.saveMelia(formData,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log("saveMelia");
      console.log(resp);
      this.getMelia();
      this.meliaPlanForm.valid?
      this._interactionsService.successMessage('Melia plan has been saved'):
      this._interactionsService.warningMessage('Melia plan has been saved, but there are incomplete fields')
    })

    
  }

}
