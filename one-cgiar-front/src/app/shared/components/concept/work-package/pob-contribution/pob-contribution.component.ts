import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';
import { ProjectionIndicatorsModalComponent } from '../../projection-indicators-modal/projection-indicators-modal.component';

@Component({
  selector: 'app-pob-contribution',
  templateUrl: './pob-contribution.component.html',
  styleUrls: ['./pob-contribution.component.scss']
})
export class PobContributionComponent implements OnInit {
  pobenefitsForm: FormGroup;
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;
  @Input() indicators;
  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
  ) {
    this.pobenefitsForm = new FormGroup({
      impactAreaIndicatorId: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  removeContribution(){

  }

  saveContribution(){
    console.log("On save");
  }

  openDialog(impactAreaIndicators) {
    console.log(impactAreaIndicators);
    // console.log(this.workPackageGeneralInfoForm.get('impactAreaIndicatorId').value);
    // impactAreaIndicators.find(impactAreaIndicator => impactAreaIndicator.id === '1').foo;
    let impactAreaIndicatorId = this.pobenefitsForm.get('impactAreaIndicatorId').value;
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
