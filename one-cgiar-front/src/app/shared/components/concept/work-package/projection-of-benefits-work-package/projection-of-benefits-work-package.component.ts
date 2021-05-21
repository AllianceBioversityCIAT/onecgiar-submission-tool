import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';
import { ProjectionIndicatorsModalComponent } from '../../projection-indicators-modal/projection-indicators-modal.component';
import { ClarisaService } from '../../../../services/clarisa.service';
import { impactArea } from '../../../../models/impactArea.interface';
import { impactAreaIndicator } from '../../../../models/impactAreaIndicator.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  ) {
    this.workPackageGeneralInfoForm = new FormGroup({
       impactAreaIndicatorId: new FormControl('', Validators.required),
       notes: new FormControl('', Validators.required),
    });
   }

  ngOnInit( ): void {
    Promise.all([ this._clarisaService.getImpactAreas().toPromise(),this._clarisaService.getImpactAreasIndicators().toPromise()]).then(resp => {
      this.impactAreas = resp[0];
      this.impactAreasIndicators = resp[1];
      this.mapImpactAreasWithIndicators();
    });
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
