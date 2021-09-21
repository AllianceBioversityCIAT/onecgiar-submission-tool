import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { ActivatedRoute } from '@angular/router';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-impact-area-is',
  templateUrl: './impact-area-is.component.html',
  styleUrls: ['./impact-area-is.component.scss']
})
export class ImpactAreaIsComponent implements OnInit {

  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public activatedRoute:ActivatedRoute,
    public _interactionsService:InteractionsService
  ) { }

  ngOnInit(): void {

    
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.cleanForm();
      // this.showDepthSacale = false;
      // this.showForm = false;

      // this.getPobImpatAreaData(routeResp.pobIaID)
      this.pobColorselected(3, 7, 16, routeResp.iaID);
      // this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);

      this._initiativesService.getImpactAreasIndicators().subscribe(resp => {

        // this.indicatorsList = this.filterIndicatorsByImpactArea(resp.response.impactAreasIndicatorsRequested, routeResp.pobIaID);
      },
        error => { console.log('#2 Error:', error) },
        () => {
          // this._initiativesService.getPOBenefitsFpByImpactArea(this._initiativesService.initiative.id, routeResp.pobIaID).subscribe(resp => {
          //   if (resp.response.projectionBenefitsByImpact) {
          //     this.updateForm(resp.response.projectionBenefitsByImpact);
          //     // console.log(this.pobImpactAreaForm.value.impact_area_indicator_id);
          //     this.getDepthDescription(this.pobImpactAreaForm.value.impact_area_indicator_id);
          //   }

          //   this.getIndicatorMetaData(this.pobImpactAreaForm.value.impact_area_indicator_id);
          //   this.showForm = true;
          // })
        })


    })
  }

  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.pobColorselected(3, 7, 16,-1)
   this.cleanForm();
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
          // this.pobImpactAreaForm.controls['impact_area_name'].setValue(sectionFinded.showName);
        }

  }


  cleanForm(){
    // this.pobImpactAreaForm.controls['projectionBenefitsId'].setValue(null);
    // this.pobImpactAreaForm.controls['impact_area_indicator_id'].setValue(null);
    // this.pobImpactAreaForm.controls['impact_area_indicator_name'].setValue(null);
    // this.pobImpactAreaForm.controls['impact_area_id'].setValue(null);
    // // this.pobImpactAreaForm.controls['impact_area_name'].setValue(null);
    // this.pobImpactAreaForm.controls['notes'].setValue(null);
    // this.pobImpactAreaForm.controls['depth_scale_id'].setValue(null);
    // this.pobImpactAreaForm.controls['depth_scale_name'].setValue(null);
    // this.pobImpactAreaForm.controls['probability_id'].setValue(null);
    // this.pobImpactAreaForm.controls['impact_area_active'].setValue(false);
    // this.indicatorMetaData.targetUnit = '';
    // this.indicatorMetaData.value = '';
    // this.indicatorMetaData.targetYear = '';
    // this.dimensionsList = [];
  }

}
