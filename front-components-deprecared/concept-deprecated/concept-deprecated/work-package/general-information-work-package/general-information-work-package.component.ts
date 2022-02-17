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
    public _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    private _dataControlService:DataControlService
  ) { 
    this.workPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      acronym: new FormControl('', Validators.required),
      id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // console.log("general on");
      // console.log("recibida la emicion");
      // console.log("WorkPackageID = "+this._dataControlService.WorkPackageID);
      this._initiativesService.getWorkPackageById(this._dataControlService.WorkPackageID).subscribe(resp=>{
        this.workPackageData = resp.response.workPackage;
        console.log(this.workPackageData);
        // console.log("NAME: "+this.workPackageData.name);
        this.setFormData();
        
        this.showform = false;
        setTimeout(() => {
          this.showform = true;
        }, 1);
        
      })
  
  
  }
  
  setFormData() {
    let {
      name,
      pathway_content,
      results,
      acronym
    } = this.workPackageData;
    this.workPackageForm.controls['name'].setValue(name);
    this.workPackageForm.controls['pathwayContent'].setValue(pathway_content);
    this.workPackageForm.controls['results'].setValue(results);
    this.workPackageForm.controls['id'].setValue(this._dataControlService.WorkPackageID);
    this.workPackageForm.controls['acronym'].setValue(acronym);
  }

  SaveGeneralInformation(): void {
    this._initiativesService.updateWorkPackage(this.workPackageForm.value).subscribe(resp=>{
      this._interactionsService.successMessage('Work package ' +this.workPackageForm.value.name+ ' information has been saved')
      this._dataControlService.menuChange$.emit();
    });
  }


}
