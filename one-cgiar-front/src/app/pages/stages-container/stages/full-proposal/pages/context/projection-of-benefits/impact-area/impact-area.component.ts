import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { map } from 'rxjs/operators';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-impact-area',
  templateUrl: './impact-area.component.html',
  styleUrls: ['./impact-area.component.scss']
})
export class ImpactAreaComponent implements OnInit {
  
  indicatorsListPOBSavedList:any = [];

  indicatorsList :any = [];
  indicatorsListLoaded =  false;
  pobIaID;
  
  constructor(
    public _initiativesService:InitiativesService,
    private _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute,
    public _interactionsService:InteractionsService,
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

  }

  detectRoute(){
    let reload = false;
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.pobIaID = routeResp.pobIaID;
      this.getProjectedBenefitLists(this.pobIaID)
      if (reload){
        this.reloadComponent();
      }else{
        this._initiativesService.getPOBenefitsFpByImpactArea(this._initiativesService.initiative.stageId,this._initiativesService.initiative.id, routeResp.pobIaID).subscribe(resp => {
          this.indicatorsListPOBSavedList = resp.response.projectionBenefitsByImpact;
        })
      }
      
      reload = true;
    })
  }

  


  saveForm(){
    this.indicatorsListPOBSavedList.map(item=>{
      console.log(item.dimensions);
      item.dimensions.map(dimesion=>dimesion.depthDescription = dimesion.description)
    })

    let cont = 0;
    let indicatorsSavedList:boolean[] = [];
    this.indicatorsListPOBSavedList.map(item=>{
      this._initiativesService.patchPOBenefitsFp(item).subscribe(resp=>{
        indicatorsSavedList.push(true);
        cont++
        if (cont == this.indicatorsListPOBSavedList.length) {
          this.reloadComponent()
        }
      },err=>(console.log(err),()=>{indicatorsSavedList.push(false)}))

    })

    this.validateAllIndicatorsSaved(indicatorsSavedList);


  }


  validateAllIndicatorsSaved(indicatorsSavedList:boolean[]){

    let allAreLoaded = true;

    indicatorsSavedList.map(item=>{
      if (item) return;
      allAreLoaded = false; 
    })

    allAreLoaded?
    this._interactionsService.successMessage('Projection of benefits has been saved'):
    this._interactionsService.warningMessage('Projection of benefits has been saved, but there are incomplete fields')

  }

  getProjectedBenefitLists(impactAreaId){
    this._initiativesService.getProjectedBenefitLists().subscribe(resp=>{
      this.indicatorsList = resp.response.impactProjectedBenefitsRequested.filter(item=>item.impactAreaId == impactAreaId && item.isApplicableProjectedBenefits == true);
    },err=>{},()=>this.indicatorsListLoaded =  true)
    
  }

  addIndicator(){
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
        //? select all wp 
        let allImpactAreas = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)
        .sections.find((section) => section.sectionId == sectionId)
        .subsections.find((subSection) => subSection.subSectionId == subSectionId)
        .dynamicList
        // clean wp activeSection attribute
        allImpactAreas.map(ia=>ia.activeSection = false)

        
        //? select current wp
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
