import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { InteractionsService } from '../../../../services/interactions.service';
import { DataControlService } from '../../../../services/data-control.service';

@Component({
  selector: 'app-general-information-work-package',
  templateUrl: './general-information-work-package.component.html',
  styleUrls: ['./general-information-work-package.component.scss']
})
export class GeneralInformationWorkPackageComponent implements OnInit {
  workPackageForm: FormGroup;
  showform = false;
  workPackageData;
  constructor(
    private _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService
  ) { 
    this.workPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this._initiativesService.getWorkPackageById(this._dataControlService.WorkPackageID).subscribe(resp=>{
      console.log(resp);
      this.workPackageData = resp.response.workPackage;
      console.log(this.workPackageData);
      this.setFormData();
      this.showform = true;
    })
  }
  
  setFormData() {
    let {
      name,
      pathway_content,
      results,
    } = this.workPackageData;
    this.workPackageForm.controls['name'].setValue(name);
    this.workPackageForm.controls['pathwayContent'].setValue(pathway_content);
    this.workPackageForm.controls['results'].setValue(results);
  }

  SaveGeneralInformation(): void {
    this._initiativesService.updateWorkPackage(this.workPackageForm.value).subscribe(resp=>{
      this._interactionsService.successMessage('Work package ' +this.workPackageForm.value.name+ ' information has been saved')
    });
  }


}
