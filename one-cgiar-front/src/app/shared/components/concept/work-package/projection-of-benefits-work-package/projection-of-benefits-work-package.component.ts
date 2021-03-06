import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';
import { ProjectionIndicatorsModalComponent } from '../../projection-indicators-modal/projection-indicators-modal.component';
import { ClarisaService } from '../../../../services/clarisa.service';
import { impactArea } from '../../../../models/impactArea.interface';
import { impactAreaIndicator } from '../../../../models/impactAreaIndicator.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { DataControlService } from '../../../../services/data-control.service';
import { ProjectionOfBenefits } from '../../../../models/projection-of-benefits.interface';
import { InteractionsService } from '../../../../services/interactions.service';

@Component({
  selector: 'app-projection-of-benefits-work-package',
  templateUrl: './projection-of-benefits-work-package.component.html',
  styleUrls: ['./projection-of-benefits-work-package.component.scss']
})
export class ProjectionOfBenefitsWorkPackageComponent implements OnInit {
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;
  impactAreas:impactArea[];
  impactAreasIndicators:impactAreaIndicator[];
  // workPackageGeneralInfoForm: FormGroup;
  constructor(
    public _requests: RequestsService,
    private _clarisaService:ClarisaService,
    private _initiativesService:InitiativesService,
    private _dataControlService:DataControlService,
    private _interactionsService:InteractionsService,
  ) {
    // this.workPackageGeneralInfoForm = new FormGroup({
    //    impactAreaIndicatorId: new FormControl('', Validators.required),
    //    notes: new FormControl('', Validators.required),
    // });
   }

  ngOnInit( ): void {
    let observableList=[
      this._clarisaService.getImpactAreas().toPromise(),
      this._clarisaService.getImpactAreasIndicators().toPromise()
    ]
    Promise.all(observableList).then(resp => {
      this.impactAreas = resp[0];
      this.impactAreasIndicators = resp[1];
      // console.log(resp);
      this.mapImpactAreasWithIndicators();
      this.getPOBenefits();
    }).catch(err=>{
      console.log(err);
    });
  }

  getPOBenefits(){
    this._initiativesService.getPOBenefits(this._dataControlService.WorkPackageID).subscribe(resp=>{
      // console.log('%c_______________','background: #222; color: #84c3fd');
      let projectionOfBenefits = resp.response?.projectedBenefits;
      // console.log(projectionOfBenefits);
      // console.log(this.impactAreas);
      // console.log('%c........................................','background: #222; color: #ffff00');
      this.impactAreas.map((impactArea)=>{
        impactArea.projectedBenefits = [];
        projectionOfBenefits.forEach(  projectionOfBenefit => {
          if (  projectionOfBenefit.impact_area_id == impactArea.id) {
            projectionOfBenefit.new = false;
            impactArea.projectedBenefits.push(  projectionOfBenefit)
          }
          // console.log(  projectionOfBenefit.impact_area_id+' '+impactArea.id);
        });
      })
      this.getTimeframes();
    },
    err=>{
      console.log('%c'+err.error.description,'background: #222; color: #fd8484');
      this.impactAreas.map((impactArea)=>{
        impactArea.projectedBenefits = [];
      })
    })
  }

  getTimeframes(){
    this.impactAreas.map(impactArea=>{
      impactArea.projectedBenefits.map(contribution=>{
        contribution.timeFrames = [];
          this._initiativesService.getPOBenefitsTimetimeframes(contribution.id).subscribe(resp=>{
            let timeFramesAux = resp.response.timeFrames;
            timeFramesAux.forEach(timeFrame => {
              contribution.timeFrames.push(timeFrame)
            });
          },
          err=>{
            console.log(err);
          })

      })
    })
    console.log(this.impactAreas);
    // this._initiativesService.getPOBenefitsTimetimeframes(1).subscribe(resp=>{
    //   console.log('%cTimeframes','background: #222; color: #84c3fd');
    //   console.log(resp.response?.timeFrames);
    // })
  }

  addNewLocalContribution(impactArea:impactArea){
    // data.impactArea.projectedBenefits.push({hola:"hello"})
    console.log(impactArea);
    let body:ProjectionOfBenefits = {
      // impact_area_indicator_id:1, 
      // impact_area_indicator_name:"Iname", 
      notes:"note test", 
      impact_area_id: impactArea.id, 
      impact_area_name: "ianme",
      active:true
    }
    impactArea.projectedBenefits.push(body)
    // console.log("helloo");
    // console.log(impactArea);
    // console.log(this.impactAreas);

  }

  mapImpactAreasWithIndicators(){
    this.impactAreas.map(impactArea=>{
      impactArea.indicators = [];
      this.impactAreasIndicators.forEach(impactAreaIndicator => {
        if (impactArea.id ===impactAreaIndicator.impactAreaId) {
          impactArea.indicators.push(impactAreaIndicator);
        }
        
      });
    })
    // console.log(this.impactAreas);
  }



}
