import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-pob-indicator',
  templateUrl: './pob-indicator.component.html',
  styleUrls: ['./pob-indicator.component.scss']
})
export class PobIndicatorComponent implements OnInit {
  @Input() indicatorsListPOBSavediItem;
  @Input() indicatorsList;
  @Input() index;
  pobImpactAreaForm: FormGroup;
  dimensionsList:any = [];
  depthScalesList:any = [];
  depthDescriptionsList:any = [];
  showDimensions = false;
  showDepthScale = false;
  // originalIndicatorId=null;
  constructor(
    public _initiativesService:InitiativesService
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

  ngOnInit(): void {
    this.showDepthScale = true;
    this.pobImpactAreaForm.valueChanges.subscribe(resp=>{
      Object.keys(this.pobImpactAreaForm.value).map(keyName=>{
        this.indicatorsListPOBSavediItem[keyName] = this.pobImpactAreaForm.value[keyName];
      })
      this.indicatorsListPOBSavediItem.dimensions = this.dimensionsList;
      
      console.log(Object.keys(this.pobImpactAreaForm.value));
      console.log(this.pobImpactAreaForm.value);
      console.log("pobImpactAreaForm change");
    })
    this.pobImpactAreaForm.get('impactAreaIndicator').valueChanges.subscribe(resp=>{
      console.log("change");
      if (resp) {
        this.depthDescriptionsList = this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.weightingValues;
        this.depthScalesList = this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.depthScales;
        this.reloadDepthScale();
        // this.showDepthScale = true;
        this.reloadDimensions();
        // this.toggleDimensionList(resp)
      }


    })
  }
  beforeindicator = null;
  getIndicatorItem(indicatorsListPOBSavediItem){
    if (indicatorsListPOBSavediItem.impactAreaIndicator != this.beforeindicator) {
      console.log(indicatorsListPOBSavediItem.impactAreaIndicator+ " != ? "+ this.beforeindicator);
      this.pobImpactAreaForm.controls['impactAreaIndicator'].setValue(indicatorsListPOBSavediItem.impactAreaIndicator);
    }
    this.beforeindicator = indicatorsListPOBSavediItem.impactAreaIndicator;
    return this.indicatorsListPOBSavediItem
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


  getIndicatorMetaData(indicatorId){
    return this.indicatorsList.find(item=>item.impactAreaIndicator == indicatorId);
  }

  updateForm(resp,pobIaID){
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(resp.id);
    this.pobImpactAreaForm.controls['impactAreaIndicator'].setValue(resp.impactAreaIndicator);
    this.pobImpactAreaForm.controls['impactAreaIndicatorName'].setValue(resp.impactAreaIndicatorName);
    this.pobImpactAreaForm.controls['impactAreaId'].setValue(Number(pobIaID));
    // this.pobImpactAreaForm.controls['impactAreaName'].setValue(resp.impactAreaName);
    this.pobImpactAreaForm.controls['notes'].setValue(resp.notes);
    this.pobImpactAreaForm.controls['depthScaleId'].setValue(resp.depthScaleId);
    this.pobImpactAreaForm.controls['probabilityID'].setValue(resp.probabilityID);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(resp.impact_area_active == null ? false : resp.impact_area_active);

    this.dimensionsList = resp.dimensions;
    //Aux
    // this.dimensionsListByIndicatorID = resp.dimensions;
    // this.originalIndicatorId = resp.impactAreaIndicator
    console.log("form");
    console.log(this.pobImpactAreaForm.value);
  }

}
