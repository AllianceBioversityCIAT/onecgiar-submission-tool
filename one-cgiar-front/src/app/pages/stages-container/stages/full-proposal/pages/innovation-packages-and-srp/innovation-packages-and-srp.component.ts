import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-innovation-packages-and-srp',
  templateUrl: './innovation-packages-and-srp.component.html',
  styleUrls: ['./innovation-packages-and-srp.component.scss']
})
export class InnovationPackagesAndSrpComponent implements OnInit {
  secionForm: FormGroup;
  showForm = false;
  constructor(
    public _initiativesService:InitiativesService
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
      this.secionForm.controls['key_principles'].setValue(resp.response.innovationPackagesData.key_principles);
      this.secionForm.controls['id'].setValue(resp.response.innovationPackagesData.id);
      this.showForm = true
    })
  }

  saveSection(){
    console.log(this.secionForm.value);
    this._initiativesService.saveInnovationPackages(this.secionForm.value,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.secionForm.controls['id'].setValue(resp.response.innovationPackages.upsertedInnovationPackages.id);
    })
  }

}
