import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataValidatorsService } from '../../../../../shared/data-validators.service';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-partners-no-impact-area',
  templateUrl: './partners-no-impact-area.component.html',
  styleUrls: ['./partners-no-impact-area.component.scss']
})
export class PartnersNoImpactAreaComponent implements OnInit {
  institutionsList=[];
  savedList=[];
  institutionsTypes=[];
  institutionsTypesSavedList=[];
  institutionsTypesDisableList=[];
  institutionsLoaded = false;
  typesLoaded = false;
  sectionForm: FormGroup;
  constructor(
   public _initiativesService: InitiativesService,
   private _dataValidatorsService: DataValidatorsService,
   private _interactionsService:InteractionsService,
   public _dataControlService:DataControlService
  ) {
    this.sectionForm = new FormGroup({
      id:new FormControl(null),
      challenge_priorization:new FormControl(null),
      research_questions:new FormControl(null),
      component_work_package:new FormControl(null),
      performance_results:new FormControl(null),
      human_capacity:new FormControl(null),
      impact_area_id:new FormControl(0),
    }, 
    // this.customValidation
    );
   }

  ngOnInit(): void {
    this._initiativesService.setTitle('Partners');
    this.getCLARISAInstitutions();
    this.getInstitutionsTypes();
    this.getImpactStrategies();
  }

  getImpactStrategies(){
    this._initiativesService.getImpactStrategies(0).subscribe(resp=>{
      if (resp.response.impactStrategies) {
        this.sectionForm.controls['id'].setValue(resp.response.impactStrategies.id);
        console.log(resp.response.impactStrategies.partners);
        resp.response.impactStrategies.partners.map(item=>{

          if (item.code) {
            this.savedList.push(item);
          }else{
            let body = {
              name:item.institutionType,
              code:item.institutionTypeId,
              id:item.id
            }
            this.institutionsTypesSavedList.push(body);
          }
          
        })
       
      }
    },err=>{console.log(err);this._dataValidatorsService.validateIfArrayHasActiveFalse(this.savedList)},
    ()=>{
      this._dataValidatorsService.validateIfArrayHasActiveFalse(this.savedList)
    })
  }

  getCLARISAInstitutions(){
    this._initiativesService.getCLARISAInstitutions('').subscribe(resp=>{
      this.institutionsList = resp;
      this.institutionsLoaded = true;
    })
  }

  getInstitutionsTypes(){
    this._initiativesService.getInstitutionsTypes().subscribe(resp=>{
      // console.log("getInstitutionsTypes");
      // console.log(resp);
      this.institutionsTypes = resp.response.types;
      // console.log(this.institutionsTypes);
      this.typesLoaded = true;
    })
  }

  saveSection(){
    let body = this.sectionForm.value;
    
    console.log(this.sectionForm.value);
    console.log(this.savedList);
    
    this.institutionsTypesSavedList.map(item=>{
      console.log(item);
      let itBody:any={}
      itBody.institutionType = item.name
      // item.institutionType = item.name;
      itBody.id = item.id?item.id:null;
      itBody.active = item.active === false?false:true;
      itBody.impact_strategies_id = this.sectionForm.value.id;
      itBody.institutionTypeId = item.code ;
      itBody.name = null;
      itBody.code = null;
      this.savedList.push(itBody)
    })
    body.partners = this.savedList;
    console.log(body);
    this._initiativesService.saveImpactStrategies(body).subscribe(resp=>{
      console.log(resp);
      // console.log(resp.response.impactStrategies.upsertedImpactStrategies.id);
      this.sectionForm.controls['id'].setValue(resp.response.impactStrategies.upsertedImpactStrategies.id);
      let sectionName = 'Partner'
      this.sectionForm.valid && this._dataValidatorsService.validateIfArrayHasActiveFalseEstrict(this.savedList,'code')?
      this._interactionsService.successMessage(`${sectionName} has been saved`):
      this._interactionsService.warningMessage(`${sectionName} has been saved, but there are incomplete fields`)
    },err=>{console.log(err);},
    ()=>{this.getInstitutionsTypes();})
  }

}
