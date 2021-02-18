import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectionIndicatorsModalComponent } from '@app/shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {


  workPackageId: number | string;
  initiativeId: any;
  public initvStgId: any;
  public createWorkPackageForm: FormGroup;
  panelOpenState = false;

  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range.value;

  constructor(public _requests: RequestsService, public activatedRoute: ActivatedRoute, public dialog: MatDialog, public initiativesSvc: InitiativesService) {
    this.createWorkPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      isGlobal: new FormControl(true, Validators.required),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }

  ngOnInit(): void {
    // console.log(this._requests.impactAreas)
    this.activatedRoute.params.subscribe(resp => {
      this._requests.urlId = resp['id'];
      this.workPackageId = resp['id'];
      this.initiativeId = resp['idIni'];
      console.log(`resp['id']`, resp['id'])
      console.log(`resp['idIni']`, resp['idIni'])
      this.initiativesSvc.getWorkPackageById(this.initiativeId).subscribe(resp => {
        console.log('resp', resp);
      })
    })
    // console.log(this.projectionRanges)
  }

  onSubmit(): void {
    this.initiativesSvc.createWorkPackages(this.createWorkPackageForm.value).subscribe(resp => {
      console.log('resp', resp);
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._requests.urlId = undefined;
    // console.log('cerrrradooooo')
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
