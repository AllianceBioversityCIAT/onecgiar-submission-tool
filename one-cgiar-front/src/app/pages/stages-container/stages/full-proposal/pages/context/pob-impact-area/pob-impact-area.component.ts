import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pob-impact-area',
  templateUrl: './pob-impact-area.component.html',
  styleUrls: ['./pob-impact-area.component.scss']
})
export class PobImpactAreaComponent implements OnInit {
  checked: boolean = true;
  pobImpactAreaForm: FormGroup;
  indicatorsList=[];
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pobImpactAreaForm = new FormGroup({
      action_area_id: new FormControl(null),
      contextId:new FormControl(null),
    });


    this.activatedRoute.params.subscribe((routeResp: any) => {
      // console.log(routeResp);
     this.pobColorselected(3, 1, 8,routeResp.pobIaID);
     this.getImpactAreasIndicators(routeResp.pobIaID);
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.pobColorselected(3, 1, 8,-1)

  }

  getImpactAreasIndicators(impactAreaId){
    this._initiativesService.getImpactAreasIndicators().subscribe(resp=>{
      console.log(resp.response.impactAreasIndicatorsRequested);
      this.indicatorsList = this.filterIndicatorsByImpactArea(resp.response.impactAreasIndicatorsRequested,impactAreaId);
      console.log(this.indicatorsList);
    })
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
    // console.log(allImpactAreas);
    // clean wp activeSection attribute
    allImpactAreas.map(wp=>wp.activeSection = false)
    // select current wp
    if (pobIaID != -1) {
      let sectionFinded = allImpactAreas.find((IA) => IA.id == pobIaID).activeSection = true;
      // console.log(sectionFinded);
    }
    // console.log(allImpactAreas);
     
  }

}
