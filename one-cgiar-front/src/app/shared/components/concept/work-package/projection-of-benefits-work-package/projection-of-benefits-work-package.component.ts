import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';
import { ProjectionIndicatorsModalComponent } from '../../projection-indicators-modal/projection-indicators-modal.component';

@Component({
  selector: 'app-projection-of-benefits-work-package',
  templateUrl: './projection-of-benefits-work-package.component.html',
  styleUrls: ['./projection-of-benefits-work-package.component.scss']
})
export class ProjectionOfBenefitsWorkPackageComponent implements OnInit {
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;
  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit( ): void {
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
