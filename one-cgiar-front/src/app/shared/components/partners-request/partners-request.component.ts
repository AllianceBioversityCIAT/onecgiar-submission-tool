import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../services/initiatives.service';

@Component({
  selector: 'app-partners-request',
  templateUrl: './partners-request.component.html',
  styleUrls: ['./partners-request.component.scss']
})
export class PartnersRequestComponent implements OnInit {
  partnersRequestForm: FormGroup;
  @Output() back = new EventEmitter();
  showForm = false;
  categoryList = [
    {
      name:'36',
      id: "36"
    }
  ]

  subCategoryList = [
    {
      name:'test 1',
      id: 1
    }
  ]

  constructor(
    private _initiativesService:InitiativesService
  ) { 
    this.partnersRequestForm = new FormGroup({

      name: new FormControl(null, Validators.required),
      acronym: new FormControl(null, Validators.required),
      websiteLink: new FormControl(null, Validators.required),
      institutionTypeCode: new FormControl(null, Validators.required),
      hqCountryIso: new FormControl(null, Validators.required),
      externalUserMail: new FormControl(null, Validators.required),
      externalUserName: new FormControl(null, Validators.required),
      externalUserComments: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
      this.setFormValue();
  }

  
  setFormValue(){
    console.log("setFormValue");
    this.showForm = true;
    this.partnersRequestForm.get("name").setValue('Submission Tool Test');
    this.partnersRequestForm.get("acronym").setValue('SBTT');
    this.partnersRequestForm.get("websiteLink").setValue('SubmissionTool.com');
    this.partnersRequestForm.get("institutionTypeCode").setValue("36");
    this.partnersRequestForm.get("hqCountryIso").setValue("AE");
    this.partnersRequestForm.get("externalUserMail").setValue("SubmissionTool@gmail.com");
    this.partnersRequestForm.get("externalUserName").setValue("test");
    this.partnersRequestForm.get("externalUserComments").setValue("test");
  }

  onCreatePartner(){
    console.log('%conCreatePartner','background: #222; color: #ffff00');
    console.log(this.partnersRequestForm.value);
    this._initiativesService.createPartner(this.partnersRequestForm.value).subscribe(resp=>{
      console.log(resp);
    },err=>{
      console.log(err);
    })
  }

  backAddNewKeyPartner(){
    this.back.emit();
  }

}
