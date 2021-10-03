import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { ActivatedRoute } from '@angular/router';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-impact-area-is',
  templateUrl: './impact-area-is.component.html',
  styleUrls: ['./impact-area-is.component.scss']
})
export class ImpactAreaIsComponent implements OnInit {
  showForm = true;
  institutionsLoaded = false;
  sectionForm: FormGroup;
  institutionsList = [];
  institutionsTypes = [];
  institutionsTypesSavedList = [];
  savedList = [];
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute,
    public _interactionsService:InteractionsService
  ) { 
    this.sectionForm = new FormGroup({
      id:new FormControl(null),
      challenge_priorization:new FormControl(null),
      research_questions:new FormControl(null),
      component_work_package:new FormControl(null),
      performance_results:new FormControl(null),
      human_capacity:new FormControl(null),
      impact_area_id:new FormControl(null),
      partners:new FormControl([]),
    });
  }

  ngOnInit(): void {

    this.getCLARISAInstitutions();
    this.getInstitutionsTypes();
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.cleanForm();
      // this.showDepthSacale = false;
      this.showForm = false;

      // this.getPobImpatAreaData(routeResp.pobIaID)
      this.pobColorselected(3, 7, 16, routeResp.iaID);
      this.sectionForm.controls['impact_area_id'].setValue(Number(routeResp.iaID));

      this._initiativesService.getImpactStrategies(this._initiativesService.initiative.id, routeResp.iaID).subscribe(resp=>{
        // console.log(resp);
        if (resp.response.impactStrategies) {
          this.updateForm(resp.response.impactStrategies);
          this.savedList = resp.response.impactStrategies.partners;
        }
      },err=>{console.log(err);},
      ()=>{this.showForm = true;})

    })
  }
 
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
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
      console.log("getInstitutionsTypes");
      this.institutionsTypes = resp.response.regions;
      // console.log(this.institutionsTypes);
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

  
  pobColorselected(stageId, sectionId, subSectionId, pobIaID){
    // select all wp 


        let allImpactAreas = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)
        .sections.find((section) => section.sectionId == sectionId)
        .subsections.find((subSection) => subSection.subSectionId == subSectionId)
        .dynamicList
        // clean wp activeSection attribute
        allImpactAreas.map(ia=>ia.activeSection = false)

        
        // select current wp
        if (pobIaID != -1) {
          console.log(allImpactAreas.find((IA) => IA.id == pobIaID));
          if (allImpactAreas.find((IA) => IA.id == pobIaID)) {
            allImpactAreas.find((IA) => IA.id == pobIaID).activeSection = true;
            let sectionFinded = allImpactAreas.find((IA) => IA.id == pobIaID)
          }

          // this.pobImpactAreaForm.controls['impact_area_name'].setValue(sectionFinded.showName);
        }

  }

  saveSection(){
    let body = this.sectionForm.value;
    
    console.log(this.sectionForm.value);
    console.log(this.savedList);
    
    this.institutionsTypesSavedList.map(item=>{
      console.log(item);
      let itBody:any={}
      itBody.institutionType = item.institutionType
      // item.institutionType = item.name;
      itBody.id = null;
      itBody.impact_strategies_id = this.sectionForm.value.id;
      itBody.institutionTypeId = item.code ;
      itBody.name = null;
      itBody.code = null;
      this.savedList.push(itBody)
    })
    body.partners = this.savedList;
    console.log(body);
    console.log(this.institutionsTypesSavedList);
    console.log(this.institutionsTypes);
    this._initiativesService.saveImpactStrategies(body,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      // console.log(resp.response.impactStrategies.upsertedImpactStrategies.id);
      this.sectionForm.controls['id'].setValue(resp.response.impactStrategies.upsertedImpactStrategies.id);
      let sectionName = 'Impact strategie'
      this.sectionForm.valid?
      this._interactionsService.successMessage(`${sectionName} has been saved`):
      this._interactionsService.warningMessage(`${sectionName} has been saved, but there are incomplete fields`)
    },err=>{console.log(err);},
    ()=>{this.getInstitutionsTypes();})
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
