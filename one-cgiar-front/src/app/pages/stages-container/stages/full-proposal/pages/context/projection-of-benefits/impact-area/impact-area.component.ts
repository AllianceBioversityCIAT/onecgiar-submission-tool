import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-impact-area',
  templateUrl: './impact-area.component.html',
  styleUrls: ['./impact-area.component.scss']
})
export class ImpactAreaComponent implements OnInit {

  pobImpactAreaForm: FormGroup;
  pobProbabilities = [];
  depthDescriptions = [];
  indicatorsList=[];
  dimensionsList:any = [
    {
      id: 1,
      depthDescriptionId:1,
      breadth_value:30000,
      active:true
     }
  ];
  currentIaId:number;
  showForm = false;
  showDepthSacale = false;
  showDepthDescription = false;
  indicatorMetaData = {
      targetYear:"",
      targetUnit: "",
      value: ""
  }
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute
  ) { 
    this.pobImpactAreaForm = new FormGroup({
      impact_area_indicator_id:new FormControl(null),
      impact_area_indicator_name:new FormControl(null),
      impact_area_id:new FormControl(null),
      impact_area_name:new FormControl(null),
      projectionBenefitsId:new FormControl(null),
      notes:new FormControl(null),
      depth_scale_id:new FormControl(null),
      depth_scale_name:new FormControl(null),
      probability_id:new FormControl(null),
      impact_area_active:new FormControl(null),
      
    });

  }


  getPobProbabilities(){
    this._initiativesService.getPobProbabilities().subscribe(resp=>{
      this.pobProbabilities = resp.response.projectedProbabilities;
    })
  }

  getDepthDescription(impactAreaId){
    this._initiativesService.getDepthDescription(impactAreaId).subscribe(resp=>{
      this.depthDescriptions = resp.response.depthDescription;
      this.depthDescriptions.map(item=>{
        item.impactAreaId = impactAreaId;
        item.depthDescriptionId = item.id;
      })
      // console.log(resp);
      
    },err=>{},
    ()=>{
      this.showDepthDescription = true;
    })
  }

  getIndicatorMetaData(indicatorId){
    if (indicatorId) {
      let item = this.indicatorsList.find(resp => resp.indicatorId == indicatorId);

      this.indicatorMetaData.targetUnit = '';
      this.indicatorMetaData.value = '';
      this.indicatorMetaData.targetYear = '';

      this.indicatorMetaData.targetUnit = item?.targetUnit;
      this.indicatorMetaData.value = item?.value;
      this.indicatorMetaData.targetYear = item?.targetYear;
    }else{
      this.indicatorMetaData.targetUnit = '';
      this.indicatorMetaData.value = '';
      this.indicatorMetaData.targetYear = '';
    }
  }


  ngOnInit(): void {
    // console.log(this.pobImpactAreaForm.value);
    this.getPobProbabilities();
    let borrar = false;
 
    this.pobImpactAreaForm.get('impact_area_indicator_id').valueChanges.subscribe(resp=>{
      console.log("valueChanges");
      if (this.pobImpactAreaForm.value.impact_area_indicator_id) {
        this.getIndicatorMetaData(this.pobImpactAreaForm.value.impact_area_indicator_id);
      }
      this.showDepthSacale = false;
      setTimeout(() => {
      this.showDepthSacale = true;
      // console.log(this.pobImpactAreaForm.value);
      }, 500);

      if (this.pobImpactAreaForm.value.impact_area_indicator_id) {
        this.getDepthDescription(this.pobImpactAreaForm.value.impact_area_indicator_id);
      }
      
    })

    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.cleanForm();
      this.showDepthSacale = false;
      this.showForm = false;

      this.getPobImpatAreaData(routeResp.pobIaID)
      this.pobColorselected(3, 1, 8, routeResp.pobIaID);
      this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);

      this._initiativesService.getImpactAreasIndicators().subscribe(resp => {

        this.indicatorsList = this.filterIndicatorsByImpactArea(resp.response.impactAreasIndicatorsRequested, routeResp.pobIaID);
      },
        error => { console.log('#2 Error:', error) },
        () => {
          this._initiativesService.getPOBenefitsFpByImpactArea(this._initiativesService.initiative.id, routeResp.pobIaID).subscribe(resp => {
            if (resp.response.projectionBenefitsByImpact) {
              this.updateForm(resp.response.projectionBenefitsByImpact);
              // console.log(this.pobImpactAreaForm.value.impact_area_indicator_id);
              this.getDepthDescription(this.pobImpactAreaForm.value.impact_area_indicator_id);
            }

            this.getIndicatorMetaData(this.pobImpactAreaForm.value.impact_area_indicator_id);
            this.showForm = true;
          })
        })

      // if (this.pobImpactAreaForm.controls['impact_area_active'].value === null) {
      //   this.pobImpactAreaForm.controls['impact_area_active'].setValue(true);
      // }







    })
    

  }

  removeDimension(index,object,itemLink:HTMLElement){
    itemLink.classList.remove('animate__animated', 'animate__fadeInRight', 'animate__faster');
    itemLink.classList.add('animate__animated', 'animate__bounceOutLeft');
    itemLink.addEventListener('animationend', () => {
      itemLink.style.maxHeight = '0px';
      if (object.depthDescriptionId) {
        object.edited = true;
        object.active = false;
        setTimeout(() => {
          itemLink.style.display = 'none';
        }, 300);
      }else{
        setTimeout(() => {
          this.dimensionsList.splice(index,1);
        }, 300);
     
      }
      
      console.log(this.dimensionsList);
    });
  }

  addDimension(){
    let item = new Object();
    item['name'] = "";
    item['id'] = null;
    this.dimensionsList.push(item);
  }

  updateForm(resp){
    // console.log(resp);
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(resp.id);
    this.pobImpactAreaForm.controls['impact_area_indicator_id'].setValue(resp.impact_area_indicator_id);
    this.pobImpactAreaForm.controls['impact_area_indicator_name'].setValue(resp.impact_area_indicator_name);
    this.pobImpactAreaForm.controls['impact_area_id'].setValue(resp.impact_area_id);
    // this.pobImpactAreaForm.controls['impact_area_name'].setValue(resp.impact_area_name);
    this.pobImpactAreaForm.controls['notes'].setValue(resp.notes);
    this.pobImpactAreaForm.controls['depth_scale_id'].setValue(resp.depth_scale_id);
    this.pobImpactAreaForm.controls['depth_scale_name'].setValue(resp.depth_scale_name);
    this.pobImpactAreaForm.controls['probability_id'].setValue(resp.probability_id);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(resp.impact_area_active);
    this.dimensionsList = resp.dimensions;

  }

  cleanForm(){
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_indicator_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_indicator_name'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_id'].setValue(null);
    // this.pobImpactAreaForm.controls['impact_area_name'].setValue(null);
    this.pobImpactAreaForm.controls['notes'].setValue(null);
    this.pobImpactAreaForm.controls['depth_scale_id'].setValue(null);
    this.pobImpactAreaForm.controls['depth_scale_name'].setValue(null);
    this.pobImpactAreaForm.controls['probability_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(null);
    this.indicatorMetaData.targetUnit = '';
    this.indicatorMetaData.value = '';
    this.indicatorMetaData.targetYear = '';
    this.dimensionsList = [];
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.pobColorselected(3, 1, 8,-1)
   this.cleanForm();
  }

 


  saveForm(){
    let body = this.pobImpactAreaForm.value;
    body.dimensions = this.dimensionsList;
    console.log(body);
    this._initiativesService.patchPOBenefitsFp(body,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
    })
  }

  getPobImpatAreaData(impactAreaId){
    this.pobImpactAreaForm.controls['impact_area_id'].setValue(impactAreaId);
  }


  filterIndicatorsByImpactArea(indicators,impactAreaId){
    return indicators.filter(item=>item.impactAreaId == impactAreaId)
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
          this.pobImpactAreaForm.controls['impact_area_name'].setValue(sectionFinded.showName);
        }

  }


}