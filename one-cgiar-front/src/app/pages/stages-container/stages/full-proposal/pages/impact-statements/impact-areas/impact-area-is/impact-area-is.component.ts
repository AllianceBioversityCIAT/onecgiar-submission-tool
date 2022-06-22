import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataValidatorsService } from '../../../../../shared/data-validators.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-impact-area-is',
  templateUrl: './impact-area-is.component.html',
  styleUrls: ['./impact-area-is.component.scss']
})
export class ImpactAreaIsComponent implements OnInit {
  showForm = true;
  institutionsLoaded = false;
  typesLoaded = false;
  sectionForm: FormGroup;
  institutionsList = [];
  institutionsTypes = [];
  institutionsTypesSavedList = [];
  institutionsTypesDisableList = [];
  savedList = [];
  iaID;

  firstTab = true;

  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute,
    public _interactionsService:InteractionsService,
    private _dataValidatorsService:DataValidatorsService,
    private router:Router
  ) { 
    this.sectionForm = new FormGroup({
      id:new FormControl(null),
      challenge_priorization:new FormControl(null, Validators.required),
      research_questions:new FormControl(null, Validators.required),
      component_work_package:new FormControl(null, Validators.required),
      performance_results:new FormControl(null, Validators.required),
      human_capacity:new FormControl(null, Validators.required),
      impact_area_id:new FormControl(null),
    }, 
    // this.customValidation
    );
  }

  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/${this._initiativesService.initiative.exactStageName}/impact-statements/impact-areas`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    // console.log("Reload");
  }


  ngOnInit(): void {
    this._initiativesService.setTitle('Impact area');
    let reload = false;
    this.getCLARISAInstitutions();
    this.getInstitutionsTypes();
    this.activatedRoute.params.subscribe((routeResp: any) => {
      if (reload){
        this.reloadComponent();
      }else{
        this.cleanForm();
        // this.showDepthSacale = false;
        this.showForm = false;
        this.iaID = routeResp.iaID
  
        this.sectionForm.controls['impact_area_id'].setValue(Number(routeResp.iaID));
        
        this.getImpactStrategies();
      }

      reload = true;
    })
  }



  getImpactStrategies(){
    this._initiativesService.getImpactStrategies(this.iaID).subscribe(resp=>{
      // console.log(resp?.response?.impactStrategies?.partners);

      if (!resp?.response?.impactStrategies) return;

      this.sectionForm.controls['id'].setValue(resp.response.impactStrategies.id);
      this.updateForm(resp.response.impactStrategies);
      // console.log(resp.response.impactStrategies.partners);
      this.savedList = [];
      this.institutionsTypesSavedList = [];
      resp?.response?.impactStrategies?.partners.map(item => {

        if (item.code) {
          this.savedList.push(item);
        } else {
          let body = {
            name: item.institutionType,
            code: item.institutionTypeId,
            id: item.id
          }
          this.institutionsTypesSavedList.push(body);
        }

      })

    },err=>{console.log(err);this._dataValidatorsService.validateIfArrayHasActiveFalse(this.savedList)},
    ()=>{
      this._dataValidatorsService.validateIfArrayHasActiveFalse(this.savedList)
      this.showForm = true;
    })
  }


  ngDoCheck(): void {
    this.pobColorselected(3, 7, 16, this.iaID);
  }
 
  ngOnDestroy(): void {
   this.pobColorselected(3, 7, 16,-1)
   this.cleanForm();
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

  updateForm(resp){
    // console.log(resp);
    this.sectionForm.controls['id'].setValue(resp.id == undefined? null: resp.id);
    this.sectionForm.controls['challenge_priorization'].setValue(resp.challenge_priorization);
    this.sectionForm.controls['research_questions'].setValue(resp.research_questions);
    this.sectionForm.controls['component_work_package'].setValue(resp.component_work_package);
    this.sectionForm.controls['performance_results'].setValue(resp.performance_results);
    this.sectionForm.controls['human_capacity'].setValue(resp.human_capacity);
    
  }

  
  pobColorselected(stageId, sectionId, subSectionId, pobIaID) {
    // select all wp 

    let allImpactAreas = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find((subSection) => subSection.subSectionId == subSectionId)
      .dynamicList
    if (!allImpactAreas?.length) return;
    // clean wp activeSection attribute
    allImpactAreas?.map(ia => ia.activeSection = false)

    // select current wp
    if (pobIaID != -1) {
      // console.log(allImpactAreas.find((IA) => IA.id == pobIaID));
      if (allImpactAreas.find((IA) => IA.id == pobIaID)) {
        allImpactAreas.find((IA) => IA.id == pobIaID).activeSection = true;
        let sectionFinded = allImpactAreas.find((IA) => IA.id == pobIaID)
      }

    }

  }

  saveSection(){
    console.log('%c saveSection', 'background: #222; color: #bada55');
    let body = this.sectionForm.value;
    
    this.institutionsTypesSavedList.map(item=>{
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
    // console.log(body?.partners);
    this._initiativesService.saveImpactStrategies(body).subscribe(resp=>{
      // console.log(resp);
      // console.log(resp.response.impactStrategies.upsertedImpactStrategies.id);
      this.sectionForm.controls['id'].setValue(resp.response.impactStrategies.upsertedImpactStrategies.id);
      let sectionName = 'Impact strategy'
      this.sectionForm.valid && this._dataValidatorsService.validateIfArrayHasActiveFalseEstrict(this.savedList,'code')?
      this._interactionsService.successMessage(`${sectionName} has been saved`):
      this._interactionsService.warningMessage(`${sectionName} has been saved, but there are incomplete fields`)
      // this.getInstitutionsTypes();
      this.getImpactStrategies();
    },err=>{console.log(err);},
    ()=>{})
  }

  cleanForm(){
    this.savedList = [];
    this.institutionsList.map(item=>item.selected = false);
    this.sectionForm.controls['challenge_priorization'].setValue(null);
    this.sectionForm.controls['research_questions'].setValue(null);
    this.sectionForm.controls['component_work_package'].setValue(null);
    this.sectionForm.controls['performance_results'].setValue(null);
    this.sectionForm.controls['human_capacity'].setValue(null);
    this.sectionForm.controls['id'].setValue(null);
  }

}
