import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-pob-indicator',
  templateUrl: './pob-indicator.component.html',
  styleUrls: ['./pob-indicator.component.scss']
})
export class PobIndicatorComponent implements OnInit {
  @Input() indicatorsListPOBSavediItem;
  @Input() indicatorsList;
  @Input() index;
  @Input() indicatorsListPOBSavedList;
  pobImpactAreaForm: FormGroup;
  dimensionsList:any = [];
  depthScalesList:any = [];
  depthDescriptionsList:any = [];
  showDimensions = false;
  showDepthScale = false;
  formUpdated = false;
  depthScaleList = [];
  // originalIndicatorId=null;
  constructor(
    public _initiativesService:InitiativesService,
    private _dataControlService:DataControlService
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
      probabilityName:new FormControl(null),
      impact_area_active:new FormControl(true),
    });
   }

  ngOnInit(): void {
  
    this.showDepthScale = true;

    this.updateForm(this.indicatorsListPOBSavediItem);


    this.pobImpactAreaForm.valueChanges.subscribe(resp=>{
      if (this.formUpdated) {
        
      
      Object.keys(this.pobImpactAreaForm.value).map(keyName=>{
        this.indicatorsListPOBSavediItem[keyName] = this.pobImpactAreaForm.value[keyName];
      })
      this.indicatorsListPOBSavediItem.dimensions = this.dimensionsList;
      // this.indicatorsListPOBSavediItem.depthScaleList = this.depthScaleList;
    }
    })
    this.pobImpactAreaForm.get('impactAreaIndicator').valueChanges.subscribe(resp=>{
      if (resp) {
        this.pobImpactAreaForm.controls['impactAreaIndicatorName'].setValue(this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.impactAreaIndicatorName);
        this.depthDescriptionsList = this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.weightingValues;
        this.depthScalesList = this.indicatorsList.find(item=>item.impactAreaIndicator == resp)?.depthScales;
        console.log(this.depthScalesList )
        this.reloadDepthScale();
        // this.showDepthScale = true;
        this.reloadDimensions();
        // this.toggleDimensionList(resp)
      }


    })
  }
  getIndicatorName(impactAreaIndicatorId){
    return this.indicatorsList.find(item=>item.impactAreaIndicator == impactAreaIndicatorId)?.impactAreaIndicatorName;
  }
  beforeindicator = null;
  getIndicatorItem(indicatorsListPOBSavediItem) {
    if (indicatorsListPOBSavediItem.impactAreaIndicator != this.beforeindicator) {
      this.pobImpactAreaForm.controls['impactAreaIndicator'].setValue(indicatorsListPOBSavediItem.impactAreaIndicator);
    }
    this.beforeindicator = indicatorsListPOBSavediItem.impactAreaIndicator;
    return this.indicatorsListPOBSavediItem
  }

  reloadDimensions() {
    this.showDimensions = false;
    setTimeout(() => {
      this.showDimensions = true;
    }, 500);
  }

  reloadDepthScale() {
    this.showDepthScale = false;
    setTimeout(() => {
      this.showDepthScale = true;
    }, 500);

  }


  getIndicatorMetaData(indicatorId) {
    return this.indicatorsList.find(item => item.impactAreaIndicator == indicatorId);
  }

  removeindicatorBlock(index, object, itemLink: HTMLElement) {
    itemLink.classList.remove('animate__animated', 'animate__fadeInRight', 'animate__faster');
    itemLink.classList.add('animate__animated', 'animate__bounceOutLeft');
    itemLink.addEventListener('animationend', () => {
      itemLink.style.maxHeight = '0px';
      if (object.projectionBenefitsId) {
        object.edited = true;
        object.active = false;
        this.unselectInpactAreaIndicatorInDropDown(object.impactAreaIndicator);
        setTimeout(() => {
          itemLink.style.display = 'none';
        }, 300);
      } else {
        this.unselectInpactAreaIndicatorInDropDown(object.impactAreaIndicator);
        setTimeout(() => {
          this.indicatorsListPOBSavedList.splice(index, 1);
        }, 300);

      }

    });
  }

  unselectInpactAreaIndicatorInDropDown(impactAreaIndicator) {
    if (impactAreaIndicator) {
      if (this.indicatorsList.find(item => item.impactAreaIndicator == impactAreaIndicator)) {
        this.indicatorsList.find(item => item.impactAreaIndicator == impactAreaIndicator).selected = false
      }
    }

  }

  updateForm(resp) {
    // console.log("RESP");
    // console.log(resp);
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(resp.id ? resp.id : null);
    if (this.pobImpactAreaForm.get("impactAreaIndicator").value) {
      this.pobImpactAreaForm.controls['impactAreaIndicator'].setValue(resp.impactAreaIndicator);
    }
    this.pobImpactAreaForm.controls['impactAreaIndicatorName'].setValue(resp.impactAreaIndicatorName);
    // if (condition) {
    //   impactAreaId
    // }
    this.pobImpactAreaForm.controls['impactAreaId'].setValue(resp.impactAreaId);
    if (resp.impactAreaName) {
      this.pobImpactAreaForm.controls['impactAreaName'].setValue(resp.impactAreaName);
    } else {
      this.pobImpactAreaForm.controls['impactAreaName'].setValue(this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == 3)
        .sections.find((section) => section.sectionId == 1)
        .subsections.find((subSection) => subSection.subSectionId == 8)
        .dynamicList.find(impactAreas => impactAreas.id == (resp.impactAreaId)).description);
    }

    this.pobImpactAreaForm.controls['notes'].setValue(resp.notes);
    this.pobImpactAreaForm.controls['depthScaleId'].setValue(resp.depthScaleId);
    this.pobImpactAreaForm.controls['probabilityID'].setValue(resp.probabilityID);
    this.pobImpactAreaForm.controls['probabilityName'].setValue(resp.probabilityName);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(resp.impact_area_active !== false ? resp.impact_area_active : false);

    this.dimensionsList = resp.dimensions ? resp.dimensions : [];
    //Aux
    // this.dimensionsListByIndicatorID = resp.dimensions;
    // this.originalIndicatorId = resp.impactAreaIndicator
    // console.log("form");
    // console.log(this.pobImpactAreaForm.value);
    this.formUpdated = true;
  }

}
