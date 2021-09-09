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
  currentIaId:number;
  showForm = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pobImpactAreaForm = new FormGroup({
      action_area_id: new FormControl(null),
      contextId:new FormControl(null),
      indicatorId:new FormControl(8),
      impactAreaId:new FormControl(null),
    });


    this.activatedRoute.params.subscribe((routeResp: any) => {
      console.log('%ccambio de ruta', 'background: #222; color: #bada55');

      console.log(routeResp);
      this.showForm = false;
      this.currentIaId = this.pobImpactAreaForm.value.indicatorId;
      console.log(this.currentIaId);

     
     this.pobColorselected(3, 1, 8,routeResp.pobIaID);
     this.getImpactAreasIndicators(routeResp.pobIaID);
    //  this.getDepthScale();
     
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.pobColorselected(3, 1, 8,-1)

  }

  getImpactAreasIndicators(impactAreaId){
    this._initiativesService.getImpactAreasIndicators().subscribe(resp=>{
      this.showForm= true;
      // console.log(resp.response.impactAreasIndicatorsRequested);
      console.log(resp.response.impactAreasIndicatorsRequested,impactAreaId);
      this.indicatorsList = this.filterIndicatorsByImpactArea(resp.response.impactAreasIndicatorsRequested,impactAreaId);
      console.log(this.indicatorsList);
      // setTimeout(() => {
        
      // }, 3000);
      
      console.log(this.showForm);
    })
  }

  // getDepthScale(){
  //   console.log(this.pobImpactAreaForm.value);
  //   console.log(this.pobImpactAreaForm.value.indicatorId);
  //   this._initiativesService.getDepthScale(this.pobImpactAreaForm.value.indicatorId).subscribe(resp=>{
  //     console.log(resp);
  //   })
  // }

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
