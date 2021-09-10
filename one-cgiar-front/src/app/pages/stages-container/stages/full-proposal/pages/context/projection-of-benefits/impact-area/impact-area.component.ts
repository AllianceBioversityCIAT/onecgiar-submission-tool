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
  indicatorsList=[];
  currentIaId:number;
  showForm = false;
  showDepthSacale = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute
  ) { 
    this.pobImpactAreaForm = new FormGroup({
      impact_area_indicator_id:new FormControl(null),
      impact_area_id:new FormControl(null),
      checked:new FormControl(null),
      projectionBenefitsId:new FormControl(null),
      notes:new FormControl(null),
      depth_scale_id:new FormControl(null),
      probability_id:new FormControl(null),
      impact_area_active:new FormControl(null),
    });

  }

  ngOnInit(): void {


    this.pobImpactAreaForm.get('impact_area_indicator_id').valueChanges.subscribe(resp=>{
      // console.log("cambio en impact_area_indicator_id");
      // console.log(resp);
      this.showDepthSacale = false;
      setTimeout(() => {
      this.showDepthSacale = true;
      }, 500);
    })

    // setTimeout(() => {


      this.activatedRoute.params.subscribe((routeResp: any) => {
        this.cleanForm();
        this.pobImpactAreaForm.controls['checked'].setValue(true);
        this.pobImpactAreaForm.controls['impact_area_active'].setValue(true);
        // console.log('%ccambio de ruta', 'background: #222; color: #bada55');
        this.showDepthSacale= false;
        // console.log(routeResp);
        this.showForm = false;
        // console.log(this.currentIaId);
  
       this.getPobImpatAreaData(routeResp.pobIaID)
       this.pobColorselected(3, 1, 8,routeResp.pobIaID);
       this.getImpactAreasIndicators(routeResp.pobIaID);

       this._initiativesService.getDepthDescription(routeResp.pobIaID).subscribe(resp=>{
        console.log(resp.response.depthDescription);
      })
       
      //  this.getDepthScale();
       
      })


    // }, 1350);

    

  }

  cleanForm(){
    this.pobImpactAreaForm.controls['impact_area_indicator_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_id'].setValue(null);
    this.pobImpactAreaForm.controls['checked'].setValue(null);
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);
    this.pobImpactAreaForm.controls['notes'].setValue(null);
    this.pobImpactAreaForm.controls['depth_scale_id'].setValue(null);
    this.pobImpactAreaForm.controls['probability_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(null);
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
      // console.log(resp.response.impactAreasIndicatorsRequested,impactAreaId);
      this.indicatorsList = this.filterIndicatorsByImpactArea(resp.response.impactAreasIndicatorsRequested,impactAreaId);
      // console.log(this.indicatorsList);
      // setTimeout(() => {
        
      // }, 3000);
      
      // console.log(this.showForm);
    })
  }


  saveForm(){
    console.log(this.pobImpactAreaForm.value);
  }

  getPobImpatAreaData(impactAreaId){
    this.pobImpactAreaForm.controls['impact_area_id'].setValue(impactAreaId);
  }

  // getDepthScale(){
  //   console.log(this.pobImpactAreaForm.value);
  //   console.log(this.pobImpactAreaForm.value.impact_area_indicator_id);
  //   this._initiativesService.getDepthScale(this.pobImpactAreaForm.value.impact_area_indicator_id).subscribe(resp=>{
  //     console.log(resp);
  //   })
  // }

  filterIndicatorsByImpactArea(indicators,impactAreaId){
    return indicators.filter(item=>item.impactAreaId == impactAreaId)
  }

  pobColorselected(stageId, sectionId, subSectionId, pobIaID){
    // select all wp 
    // console.log(this._dataControlService.userMenu);
    let cont = 0;
    
      
  
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
