import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';
import { ProjectionIndicatorsModalComponent } from '../../projection-indicators-modal/projection-indicators-modal.component';
import { ClarisaService } from '../../../../services/clarisa.service';
import { impactArea } from '../../../../models/impactArea.interface';
import { impactAreaIndicator } from '../../../../models/impactAreaIndicator.interface';

@Component({
  selector: 'app-projection-of-benefits-work-package',
  templateUrl: './projection-of-benefits-work-package.component.html',
  styleUrls: ['./projection-of-benefits-work-package.component.scss']
})
export class ProjectionOfBenefitsWorkPackageComponent implements OnInit {
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;
  impactAreas:impactArea[];
  impactAreasIndicators:impactAreaIndicator[];
  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
    private _clarisaService:ClarisaService,
  ) { }

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

  openDialog() {
    const dialogRef = this.dialog.open(ProjectionIndicatorsModalComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
