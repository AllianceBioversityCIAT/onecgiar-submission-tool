import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-innovation-packages-and-srp',
  templateUrl: './innovation-packages-and-srp.component.html',
  styleUrls: ['./innovation-packages-and-srp.component.scss']
})
export class InnovationPackagesAndSrpComponent implements OnInit {
  secionForm: FormGroup;
  showForm = false;
  constructor(
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService
  ) {
    this.secionForm = new FormGroup({
      id: new FormControl(null),
      key_principles: new FormControl(null),
    });
   }

  ngOnInit(): void {
    this.getInnovationPackages()
  }
  getInnovationPackages(){
    this._initiativesService.getInnovationPackages(this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp.response.innovationPackagesData);
      if (resp.response.innovationPackagesData) {
        this.secionForm.controls['key_principles'].setValue(resp.response.innovationPackagesData.key_principles);
        this.secionForm.controls['id'].setValue(resp.response.innovationPackagesData.id);
      }
      this.showForm = true
    })
  }

  saveSection(){
    console.log(this.secionForm.value);
    this._initiativesService.saveInnovationPackages(this.secionForm.value,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.secionForm.controls['id'].setValue(resp.response.innovationPackages.upsertedInnovationPackages.id);
      this.secionForm.valid?
      this._interactionsService.successMessage('Innovation Packages and Scaling Readiness Plan has been saved'):
      this._interactionsService.warningMessage('Innovation Packages and Scaling Readiness Plan has been saved, but there are incomplete fields')
      this._dataControlService.validateMenu$.emit();
    })
  }

}
