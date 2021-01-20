import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectionIndicatorsModalComponent } from '@app/shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';

@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  panelOpenState = false;

  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;

  constructor(public _requests: RequestsService, public activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    // console.log(this._requests.impactAreas)
    this.activatedRoute.params.subscribe(resp => {
      this._requests.urlId = resp['id'];
      console.log(resp['id']);
    })
    // console.log(this.projectionRanges)
  }

  onSave(informationForm): void {
    console.log("GUARDANDO", informationForm.value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectionIndicatorsModalComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
