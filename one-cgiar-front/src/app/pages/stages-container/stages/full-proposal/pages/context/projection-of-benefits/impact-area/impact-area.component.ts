import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { FormControl, FormGroup } from '@angular/forms';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-impact-area',
  templateUrl: './impact-area.component.html',
  styleUrls: ['./impact-area.component.scss']
})
export class ImpactAreaComponent implements OnInit {
  
  indicatorsListPOBSavedList:any = [
    // {
    //     "impactAreaIndicatorName": "#people benefiting from relevant CGIAR innovations",
    //     "impactAreaIndicator": 9
    // },
    // {
    //     "impactAreaIndicatorName": "#people meeting minimum dietary energy requirements",
    //     "impactAreaIndicator": 8
    // }
];

  indicatorsList :any = [];
  indicatorsListLoaded =  false;
  pobIaID;
  
  constructor(
    public _initiativesService:InitiativesService,
    private _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(){
    this.detectRoute();
  }


  currentRoute = this.router.routerState.snapshot.url;
  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/context/projection-of-benefits`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
    console.log("Reload");
  }

  detectRoute(){
    let reload = false;
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.pobIaID = routeResp.pobIaID;
      this.getProjectedBenefitLists(this.pobIaID)
      if (reload){
        this.reloadComponent();
      }else{
        // console.log('%c '+this.pobIaID, 'background: #222; color: #00ffff');
        this._initiativesService.getPOBenefitsFpByImpactArea(this._initiativesService.initiative.id, routeResp.pobIaID).subscribe(resp => {
          // console.log(resp.response.projectionBenefitsByImpact);
          this.indicatorsListPOBSavedList = resp.response.projectionBenefitsByImpact;
          if (resp.response.projectionBenefitsByImpact) {
            // this.updateForm(resp.response.projectionBenefitsByImpact,routeResp.pobIaID);
            // console.log(this.pobImpactAreaForm.value.impactAreaIndicatorName);
          }else{
            console.log('%c Not created', 'background: #222; color: #bada55');
          }
  
        })
      }
      


      reload = true;
    })
  }

  


  saveForm(){
    console.log("saveForm");
    // console.log(this.indicatorsListPOBSavedList);
    this.indicatorsListPOBSavedList.map(item=>{
      console.log(item.dimensions);
      item.dimensions.map(dimesion=>dimesion.depthDescription = dimesion.description)
    })
    // console.log(this.indicatorsListPOBSavedList);
    // console.log(this.indicatorsListPOBSavedList[0]);
    // console.log(this.indicatorsListPOBSavedList);
    let cont = 0;
    // console.log(this.indicatorsListPOBSavedList.length);
    this.indicatorsListPOBSavedList.map(item=>{

      console.log(item);
      this._initiativesService.patchPOBenefitsFp(item,this._initiativesService.initiative.id).subscribe(resp=>{
        console.log(resp);
        cont++
        if (cont == this.indicatorsListPOBSavedList.length) {
          this.reloadComponent()
        }
      },err=>(console.log(err),()=>{}))

    })



    // 
  }

  getProjectedBenefitLists(impactAreaId){
    this._initiativesService.getProjectedBenefitLists().subscribe(resp=>{
      // console.log("getProjectedBenefitLists");
      // console.log(resp);
      this.indicatorsList = resp.response.impactProjectedBenefitsRequested.filter(item=>item.impactAreaId == impactAreaId && item.isApplicableProjectedBenefits == true);
      // console.log(this.indicatorsList);
    },err=>{},()=>this.indicatorsListLoaded =  true)
    
  }

  addIndicator(){
    console.log(this.indicatorsListPOBSavedList.length+ ' < ' +this.indicatorsList.length);
    if (this.indicatorsListPOBSavedList.length < this.indicatorsList.length) {
      let item = new Object();
      item['impactAreaIndicatorName'] = "";
      item['impactAreaIndicator'] = null;
      // impact areas
      item['impactAreaName'] = "";
      item['impactAreaId'] = this.pobIaID;
      item['impact_area_active'] = true; 
      this.indicatorsListPOBSavedList.push(item);
    }
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
          // console.log(allImpactAreas);
          allImpactAreas.find((IA) => IA.id == pobIaID).activeSection = true;
          let sectionFinded = allImpactAreas.find((IA) => IA.id == pobIaID)
          // this.pobImpactAreaForm.controls['impactAreaName'].setValue(sectionFinded.showName);
        }

  }
    
  ngDoCheck(): void {
    this.pobColorselected(3, 1, 8, this.pobIaID);
  }

  ngOnDestroy(): void {
   this.pobColorselected(3, 1, 8,-1)
  }

}
