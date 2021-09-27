import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { FormControl, FormGroup } from '@angular/forms';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-impact-area',
  templateUrl: './impact-area.component.html',
  styleUrls: ['./impact-area.component.scss']
})
export class ImpactAreaComponent implements OnInit {

  pobImpactAreaForm: FormGroup;
  pobProbabilities = [];
  
  // select lists
  indicatorsList = [];
  depthDescriptionsList:any = [];
  depthScalesList = []
  //

  dimensionsList:any = [];

  originalIndicatorId=null;
  dimensionsListByIndicatorID:any = [];


  currentIaId:number;


  showForm = false;
  showDimensions = false;
  showDepthDescription = false;
  showDepthScale = false;


  indicatorMetaData = {
      targetYear:"",
      targetUnit: "",
      value: ""
  }
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute,
    public _interactionsService:InteractionsService
  ) { 
    this.pobImpactAreaForm = new FormGroup({
      impactAreaIndicator:new FormControl(null),
      impactAreaIndicatorName:new FormControl(null),
      impactAreaId:new FormControl(null),
      impactAreaName:new FormControl(null),
      projectionBenefitsId:new FormControl(null),
      notes:new FormControl(null),
      depthScaleId:new FormControl(null),
      depthScaleName:new FormControl(null),
      probabilityID:new FormControl(null),
      impact_area_active:new FormControl(null),
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.pobColorselected(3, 1, 8,-1)
   this.cleanForm();

  }

  ngOnInit(): void {
    

    this.pobImpactAreaForm.get('impactAreaIndicator').valueChanges.subscribe(resp=>{

      if (resp) {
        this.depthDescriptionsList = this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.weightingValues;
        this.depthScalesList = this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.depthScales;
        this.reloadDepthScale();
        this.reloadDimensions();
        this.getIndicatorMetaData(resp);
        this.toggleDimensionList(resp)
      }


    })

    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.cleanForm();
      this.pobColorselected(3, 1, 8, routeResp.pobIaID);
      this.getProjectedBenefitLists(routeResp.pobIaID);

      this.pobImpactAreaForm.controls['impactAreaId'].setValue(Number(routeResp.pobIaID));
      this._initiativesService.getPOBenefitsFpByImpactArea(this._initiativesService.initiative.id, routeResp.pobIaID).subscribe(resp => {

        if (resp.response.projectionBenefitsByImpact) {
          this.updateForm(resp.response.projectionBenefitsByImpact);
        }
        this.reloadForm();
      })


    })
    

  }

    
  getProjectedBenefitLists(impactAreaId){
    this._initiativesService.getProjectedBenefitLists().subscribe(resp=>{
      this.indicatorsList = resp.response.impactProjectedBenefitsRequested.filter(item=>item.impactAreaId == impactAreaId);
      // console.log(this.indicatorsList);
      this.reloadForm();
    })
  }

  reloadForm(){
    this.showForm = false;
    setTimeout(() => {
     this.showForm = true;
    }, 500);
  }

  reloadDimensions(){
    this.showDimensions = false;
    setTimeout(() => {
     this.showDimensions = true;
    }, 500);
  }

  reloadDepthScale(){
    this.showDepthScale = false;
    setTimeout(() => {
     this.showDepthScale = true;
    }, 500);
    
  }

  // getPobProbabilities(){
  //   this._initiativesService.getPobProbabilities().subscribe(resp=>{
  //     this.pobProbabilities = resp.response.projectedProbabilities;
  //   })
  // }

  getIndicatorMetaData(indicatorId){
    if (indicatorId) {
      let item = this.indicatorsList.find(item=>item.impactAreaIndicator == indicatorId);

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

  removeDimension(index,object,itemLink:HTMLElement){
    itemLink.classList.remove('animate__animated', 'animate__fadeInRight', 'animate__faster');
    itemLink.classList.add('animate__animated', 'animate__bounceOutLeft');
    itemLink.addEventListener('animationend', () => {
      itemLink.style.maxHeight = '0px';
      if (object.descriptionID) {
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

    });
  }

  addDimension(){
    let item = new Object();
    item['name'] = "";
    item['id'] = null;
    this.dimensionsList.push(item);
  }

  toggleDimensionList(indicatorId){
    this.dimensionsList = [];
    if(indicatorId == this.originalIndicatorId){
      this.dimensionsList = this.dimensionsListByIndicatorID;
    }
  }

  updateForm(resp){
    // console.log(resp);
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(resp.id);
    this.pobImpactAreaForm.controls['impactAreaIndicator'].setValue(resp.impactAreaIndicator);
    this.pobImpactAreaForm.controls['impactAreaIndicatorName'].setValue(resp.impactAreaIndicatorName);
    
    // this.pobImpactAreaForm.controls['impactAreaName'].setValue(resp.impactAreaName);
    this.pobImpactAreaForm.controls['notes'].setValue(resp.notes);
    this.pobImpactAreaForm.controls['depthScaleId'].setValue(resp.depthScaleId);
    this.pobImpactAreaForm.controls['probabilityID'].setValue(resp.probabilityID);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(resp.impact_area_active == null ? false : resp.impact_area_active);

    this.dimensionsList = resp.dimensions;
    //Aux
    this.dimensionsListByIndicatorID = resp.dimensions;
    this.originalIndicatorId = resp.impactAreaIndicator
  }

  cleanForm(){
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);
    this.pobImpactAreaForm.controls['impactAreaIndicator'].setValue(null);
    this.pobImpactAreaForm.controls['impactAreaIndicatorName'].setValue(null);
    this.pobImpactAreaForm.controls['impactAreaId'].setValue(null);
    // this.pobImpactAreaForm.controls['impactAreaName'].setValue(null);
    this.pobImpactAreaForm.controls['notes'].setValue(null);
    this.pobImpactAreaForm.controls['depthScaleId'].setValue(null);
    this.pobImpactAreaForm.controls['depthScaleName'].setValue(null);
    this.pobImpactAreaForm.controls['probabilityID'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(false);
    this.indicatorMetaData.targetUnit = '';
    this.indicatorMetaData.value = '';
    this.indicatorMetaData.targetYear = '';
    this.dimensionsList = [];
    // this.indicatorsList = [];
    // this.depthDescriptionsList = [];
    // this.depthScalesList = []
  }

  saveForm(){
    let body = this.pobImpactAreaForm.value;
    body.dimensions = this.dimensionsList;
    console.log(body);
    this._initiativesService.patchPOBenefitsFp(body,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(resp.response.projectionBenefits.upsertedPjectionBenefits.id);
      this.pobImpactAreaForm.valid?
      this._interactionsService.successMessage('Projection of benfits - Impact area has been saved'):
      this._interactionsService.warningMessage('Projection of benfits - Impact area has been saved, but there are incomplete fields')
    })
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
          this.pobImpactAreaForm.controls['impactAreaName'].setValue(sectionFinded.showName);
        }

  }


}
