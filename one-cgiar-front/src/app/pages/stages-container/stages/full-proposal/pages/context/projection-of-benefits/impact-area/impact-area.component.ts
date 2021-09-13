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
      checked:new FormControl(null),
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
      // console.log(resp.response.projectedProbabilities);
    })
  }

  getIndicatorMetaData(indicatorId){
    if (indicatorId) {
      console.log(indicatorId);
      console.log(this.indicatorsList);
      let item = this.indicatorsList.find(resp => resp.indicatorId == indicatorId);
      console.log(item);

      this.indicatorMetaData.targetUnit = '';
      this.indicatorMetaData.value = '';
      this.indicatorMetaData.targetYear = '';

      this.indicatorMetaData.targetUnit = item.targetUnit;
      this.indicatorMetaData.value = item.value;
      this.indicatorMetaData.targetYear = item.targetYear;
    }
  }


  ngOnInit(): void {

    this.getPobProbabilities();
    this.pobImpactAreaForm.get('impact_area_indicator_id').valueChanges.subscribe(resp=>{
      // console.log("cambio en impact_area_indicator_id");
      // console.log(resp);
      this.clearFormThatDependedsOnIndicators();
      this.getIndicatorMetaData(this.pobImpactAreaForm.value.impact_area_indicator_id);
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
        // console.log(resp.response.depthDescription);
      })
       
      //  this.getDepthScale();
       
      })


    // }, 1350);

    

  }

  addDimension(){
    // let item={};
    let item = new Object();
    item['name'] = "";
    item['id'] = "";
    this.dimensionsList.push(item);
    // console.log(this.dimensionsList);
  }

  cleanForm(){
    this.pobImpactAreaForm.controls['impact_area_indicator_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_indicator_name'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_name'].setValue(null);
    this.pobImpactAreaForm.controls['checked'].setValue(null);
    this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);
    this.pobImpactAreaForm.controls['notes'].setValue(null);
    this.pobImpactAreaForm.controls['depth_scale_id'].setValue(null);
    this.pobImpactAreaForm.controls['depth_scale_name'].setValue(null);
    this.pobImpactAreaForm.controls['probability_id'].setValue(null);
    this.pobImpactAreaForm.controls['impact_area_active'].setValue(null);
  }

  clearFormThatDependedsOnIndicators(){
    this.pobImpactAreaForm.controls['depth_scale_id'].setValue(null);
    this.pobImpactAreaForm.controls['depth_scale_name'].setValue(null);
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
    // console.log(this.pobImpactAreaForm.value);
    let body = this.pobImpactAreaForm.value;
    body.dimensions = this.dimensionsList;
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

        let allImpactAreas = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)
        .sections.find((section) => section.sectionId == sectionId)
        .subsections.find((subSection) => subSection.subSectionId == subSectionId)
        .dynamicList
        // console.log(allImpactAreas);
        // clean wp activeSection attribute
        allImpactAreas.map(ia=>ia.activeSection = false)

        
        // select current wp
        if (pobIaID != -1) {
          allImpactAreas.find((IA) => IA.id == pobIaID).activeSection = true;
          let sectionFinded = allImpactAreas.find((IA) => IA.id == pobIaID)
          // console.log(sectionFinded);
          this.pobImpactAreaForm.controls['impact_area_name'].setValue(sectionFinded.showName);
          // console.log(sectionFinded);
        }
        // console.log(allImpactAreas);
        
      
    

     
  }


}
