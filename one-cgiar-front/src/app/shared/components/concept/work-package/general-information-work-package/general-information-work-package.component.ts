import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { InteractionsService } from '../../../../services/interactions.service';

@Component({
  selector: 'app-general-information-work-package',
  templateUrl: './general-information-work-package.component.html',
  styleUrls: ['./general-information-work-package.component.scss']
})
export class GeneralInformationWorkPackageComponent implements OnInit {
  workPackageForm: FormGroup;
  showform = true;
  workPackageData;
  constructor(
    private _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService
  ) { 
    this.workPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log("Hello general");
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
