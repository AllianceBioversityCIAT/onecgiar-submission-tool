import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { InitiativesService } from '../../services/initiatives.service';
import { InteractionsService } from '../../services/interactions.service';
import { ConceptService } from '../../services/concept.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-partners-request',
  templateUrl: './partners-request.component.html',
  styleUrls: ['./partners-request.component.scss']
})
export class PartnersRequestComponent implements OnInit {
  partnersRequestForm: FormGroup;
  institutionTypes=[];
  countriesList=[];
  conceptInfo:any;
  @Output() back = new EventEmitter();
  loaded={
    institutionTypes:false
  }
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
    public _initiativesService:InitiativesService,
    private spinnerService: NgxSpinnerService,
    private _interactionsService:InteractionsService,
    private _conceptService:ConceptService,
    private dialogRef: MatDialogRef<PartnersRequestComponent>
  ) { 
    this.partnersRequestForm = new FormGroup({

      name: new FormControl(null, Validators.required),
      acronym: new FormControl(null),
      websiteLink: new FormControl(null, Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/)),
      institutionTypeCode: new FormControl(null, Validators.required),
      hqCountryIso: new FormControl(null, Validators.required),
      externalUserMail: new FormControl(null),
      externalUserName: new FormControl(null),
      externalUserComments: new FormControl(null),
    });
  }

  ngOnInit(): void {

      this.setFormValue();
      this.getInstitutionsTypes();
      // this.getInitiativeName();
  }


  getInstitutionsTypes(){
    this._initiativesService.getInstitutionsTypes().subscribe(resp=>{
      // console.log('%cgetInstitutionsTypes','background: #222; color: #ffff00');
      // console.log(resp.response.regions);
      this.institutionTypes = resp.response?.regions;
      this.loaded.institutionTypes = true;
    })
  }

  // getInitiativeName(){
  //   this._conceptService.getConcept(this._initiativesService.initvStgId).subscribe(resp=>{
  //     console.log(resp);
  //     this.conceptInfo = resp;
  //     this.partnersRequestForm.get("externalUserComments").setValue(this.setComment());
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
    this.partnersRequestForm.get("externalUserComments").setValue(this.setComment());
    console.log( this.partnersRequestForm.controls["websiteLink"].valid);
    console.log(this.partnersRequestForm.get("websiteLink").valid);
  }

  getWebValidation(){
  return this.partnersRequestForm.get("websiteLink").valid
  }
  setComment(){
    let userData:any= JSON.parse(localStorage.getItem('user')) ;
    let commentArray = [
      'From: Submission Tool',
      `Initiative ID: ${this._initiativesService?.initiative.official_code} \n`,
      // `InitiativeName: ${this.conceptInfo?.conceptName}`,
      `Stage: ${this._initiativesService?.initiative.stageName} \n`,
      `Section: Key Partners`
    ]
    let result='';
    commentArray.forEach(text => {
      result += text + ';\n ';
    });
    return result
  }

  onCreatePartner(){
    // console.log('%conCreatePartner','background: #222; color: #ffff00');
    console.log(this.partnersRequestForm.value);
    console.log(this._initiativesService.initiative);
    // this.spinnerService.show('partners-request');

    this._initiativesService.createPartner(this.partnersRequestForm.value).subscribe(resp=>{
    this._interactionsService.simpleCustomConfirmModal({type:`success`, 
                                                        title:`Success`,
                                                        text:`Partner "${this.partnersRequestForm.value.name}" has been requested`});
    this.spinnerService.hide('partners-request');
    this.backAddNewKeyPartner();
    },err=>{
      console.log(err);
      this.spinnerService.hide('partners-request');
    },()=>{

    })

  }

  backAddNewKeyPartner(){
    this.dialogRef.close()
    this.back.emit();
  }

}
