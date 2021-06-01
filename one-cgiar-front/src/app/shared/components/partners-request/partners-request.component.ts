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
  institutionTypes=[];
  countriesList=[];
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
    public _initiativesService:InitiativesService
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
      this.getInstitutionsTypes()
      // this.getCLARISAInstitutions()
  }


  getInstitutionsTypes(){
    this._initiativesService.getInstitutionsTypes().subscribe(resp=>{
      console.log('%cgetInstitutionsTypes','background: #222; color: #ffff00');
      console.log(resp.response?.institutionsTypes);
      this.institutionTypes = resp.response?.institutionsTypes;
    })
  }

  // getCLARISAInstitutions(){
  //   this._initiativesService.getCLARISAInstitutions('').subscribe(resp=>{
  //     console.log('%cgetCLARISAInstitutions','background: #222; color: #ffff00');
  //     console.log(resp);
  //     this.countriesList = resp.response?.institutions;
  //   })
  // }


  
  setFormValue(){
    let userData:any= JSON.parse(localStorage.getItem('user')) ;
    // console.log("setFormValue");
    this.showForm = true;
    this.partnersRequestForm.get("name").setValue('');
    this.partnersRequestForm.get("acronym").setValue('');
    this.partnersRequestForm.get("websiteLink").setValue('');
    this.partnersRequestForm.get("institutionTypeCode").setValue("");
    this.partnersRequestForm.get("hqCountryIso").setValue("");
    this.partnersRequestForm.get("externalUserMail").setValue(userData.email);
    this.partnersRequestForm.get("externalUserName").setValue(userData.name);
    this.partnersRequestForm.get("externalUserComments").setValue("");
  }

  onCreatePartner(){
    // console.log('%conCreatePartner','background: #222; color: #ffff00');
    // console.log(this.partnersRequestForm.value);
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
