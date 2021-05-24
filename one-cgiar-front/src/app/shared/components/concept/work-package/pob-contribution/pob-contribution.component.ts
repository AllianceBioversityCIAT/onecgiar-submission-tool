import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '@app/shared/services/requests.service';
import { ProjectionIndicatorsModalComponent } from '../../projection-indicators-modal/projection-indicators-modal.component';
import { InitiativesService } from '../../../../services/initiatives.service';
import { DataControlService } from '../../../../services/data-control.service';
import { ProjectionOfBenefits } from '../../../../models/projection-of-benefits.interface';

@Component({
  selector: 'app-pob-contribution',
  templateUrl: './pob-contribution.component.html',
  styleUrls: ['./pob-contribution.component.scss']
})
export class PobContributionComponent implements OnInit {
  poBenefitsForm: FormGroup;
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;
  @Input() indicators;
  @Input() contribution:ProjectionOfBenefits;
  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
    private _initiativesService:InitiativesService,
    private _dataControlService:DataControlService
  ) {
    this.poBenefitsForm = new FormGroup({
      wrkPkgId: new FormControl(null, Validators.required),
      impact_area_indicator_id: new FormControl(null, Validators.required),
      impact_area_indicator_name: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.required),
      impact_area_id: new FormControl(null, Validators.required),
      impact_area_name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.setFormValue();
  }

  removeContribution(){

  }

  setFormValue(){
    this.poBenefitsForm.get("wrkPkgId").setValue( this._dataControlService.WorkPackageID);
    this.poBenefitsForm.get("impact_area_indicator_id").setValue(this.contribution.impact_area_indicator_id);
    this.poBenefitsForm.get("impact_area_indicator_name").setValue(this.contribution.impact_area_indicator_name);
    this.poBenefitsForm.get("notes").setValue(this.contribution.notes);
    this.poBenefitsForm.get("impact_area_id").setValue(this.contribution.impact_area_id);
    this.poBenefitsForm.get("impact_area_name").setValue(this.contribution.impact_area_name);
    this.poBenefitsForm.get("notes").setValue(this.contribution.notes);
  }

  saveContribution(){
    console.log("On save");
    this._initiativesService.patchPOBenefits(this.poBenefitsForm.value).subscribe(resp=>{
      console.log(resp);
    });
  }

  openDialog(impactAreaIndicators) {
    console.log(impactAreaIndicators);
    // console.log(this.workPackageGeneralInfoForm.get('impactAreaIndicatorId').value);
    // impactAreaIndicators.find(impactAreaIndicator => impactAreaIndicator.id === '1').foo;
    let impactAreaIndicatorId = this.poBenefitsForm.get('impactAreaIndicatorId').value;
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
