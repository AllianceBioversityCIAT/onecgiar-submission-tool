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
  sectionForm: FormGroup;
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
      impact_area_id:new FormControl(null),
      partners:new FormControl([]),
    });
  }

  ngOnInit(): void {

    
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.cleanForm();
      // this.showDepthSacale = false;
      this.showForm = false;

      // this.getPobImpatAreaData(routeResp.pobIaID)
      this.pobColorselected(3, 7, 16, routeResp.iaID);
      this.sectionForm.controls['impact_area_id'].setValue(Number(routeResp.iaID));

      this._initiativesService.getImpactStrategies(this._initiativesService.initiative.id, routeResp.iaID).subscribe(resp=>{
        console.log(resp);
        if (resp.response.impactStrategies) this.updateForm(resp.response.impactStrategies);
        
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

  updateForm(resp){
    // console.log(resp);
    this.sectionForm.controls['id'].setValue(resp.id == undefined? null: resp.id);
    this.sectionForm.controls['challenge_priorization'].setValue(resp.challenge_priorization);
    this.sectionForm.controls['research_questions'].setValue(resp.research_questions);
    this.sectionForm.controls['component_work_package'].setValue(resp.component_work_package);
    this.sectionForm.controls['performance_results'].setValue(resp.performance_results);
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
          allImpactAreas.find((IA) => IA.id == pobIaID).activeSection = true;
          let sectionFinded = allImpactAreas.find((IA) => IA.id == pobIaID)
          // this.pobImpactAreaForm.controls['impact_area_name'].setValue(sectionFinded.showName);
        }

  }

  saveSection(){
    let body = this.sectionForm.value;
    console.log(this.sectionForm.value);
    this._initiativesService.saveImpactStrategies(body,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      // console.log(resp.response.impactStrategies.upsertedImpactStrategies.id);
      this.sectionForm.controls['id'].setValue(resp.response.impactStrategies.upsertedImpactStrategies.id);
    })
  }

  cleanForm(){
    this.sectionForm.controls['challenge_priorization'].setValue(null);
    this.sectionForm.controls['research_questions'].setValue(null);
    this.sectionForm.controls['component_work_package'].setValue(null);
    this.sectionForm.controls['performance_results'].setValue(null);
    this.sectionForm.controls['id'].setValue(null);
  }

}
