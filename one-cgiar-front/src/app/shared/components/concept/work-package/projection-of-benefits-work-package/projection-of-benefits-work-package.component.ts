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

@Component({
  selector: 'app-projection-of-benefits-work-package',
  templateUrl: './projection-of-benefits-work-package.component.html',
  styleUrls: ['./projection-of-benefits-work-package.component.scss']
})
export class ProjectionOfBenefitsWorkPackageComponent implements OnInit {
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;
  impactAreas:impactArea[];
  impactAreasIndicators:impactAreaIndicator[];
  workPackageGeneralInfoForm: FormGroup;
  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
    private _clarisaService:ClarisaService,
    private _initiativesService:InitiativesService,
    private _dataControlService:DataControlService
  ) {
    this.workPackageGeneralInfoForm = new FormGroup({
       impactAreaIndicatorId: new FormControl('', Validators.required),
       notes: new FormControl('', Validators.required),
    });
   }

  ngOnInit( ): void {
    let observableList=[
      this._clarisaService.getImpactAreas().toPromise(),
      this._clarisaService.getImpactAreasIndicators().toPromise()
    ]
    Promise.all(observableList).then(resp => {
      this.impactAreas = resp[0];
      this.impactAreasIndicators = resp[1];
      console.log(resp);
      this.mapImpactAreasWithIndicators();
      this.getPOBenefits();
    }).catch(err=>{
      console.log(err);
    });
  }

  getPOBenefits(){
    this._initiativesService.getPOBenefits(this._dataControlService.WorkPackageID).subscribe(resp=>{
      console.log('%c_______________','background: #222; color: #84c3fd');
      let projectionOfBenefits = resp.response?.projectedBenefits;
      console.log(projectionOfBenefits);
      console.log(this.impactAreas);
      console.log('%c........................................','background: #222; color: #ffff00');
      this.impactAreas.map((impactArea)=>{
        impactArea.projectedBenefits = [];
        projectionOfBenefits.forEach(  projectionOfBenefit => {
          if (  projectionOfBenefit.impact_area_id == impactArea.id) {
            impactArea.projectedBenefits.push(  projectionOfBenefit)
          }
          console.log(  projectionOfBenefit.impact_area_id+' '+impactArea.id);
        });
      })
    },
    err=>{
      console.log('%c'+err.error.description,'background: #222; color: #fd8484');
    })
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
    console.log(this.impactAreas);
  }

  openDialog(impactAreaIndicators) {
    console.log(impactAreaIndicators);
    // console.log(this.workPackageGeneralInfoForm.get('impactAreaIndicatorId').value);
    // impactAreaIndicators.find(impactAreaIndicator => impactAreaIndicator.id === '1').foo;
    let impactAreaIndicatorId = this.workPackageGeneralInfoForm.get('impactAreaIndicatorId').value;
    let targetUnit = impactAreaIndicators.find(impactAreaIndicator => impactAreaIndicator.indicatorId == impactAreaIndicatorId)?.targetUnit;
    console.log(targetUnit);
    console.log(impactAreaIndicatorId);
    let data={
      targetUnit
    };
    const dialogRef = this.dialog.open(ProjectionIndicatorsModalComponent, {
      panelClass: 'custom-dialog-container',
      width:'60%',
      data
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
