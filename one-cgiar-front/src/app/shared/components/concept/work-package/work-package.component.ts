import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectionIndicatorsModalComponent } from '@app/shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-package',
  templateUrl: './work-package.component.html',
  styleUrls: ['./work-package.component.scss'],
})
export class WorkPackageComponent implements OnInit {
  @Input() workPackageData: any;
  workPackageId: number | string;
  initiativeId: any;
  public initvStgId: any;
  public createWorkPackageForm: FormGroup;
  panelOpenState = false;
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range
    .value;

  constructor(
    public _requests: RequestsService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public initiativesSvc: InitiativesService
  ) {
    this.createWorkPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      isGlobal: new FormControl(true, Validators.required),
      initvStgId: new FormControl(this.initvStgId, Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.workPackageData.name);
    this.setFormData();
  }

  onUpdate(): void {
    console.log('%cReady to update','background: #222; color: #ffff00');
    console.log(  this.createWorkPackageForm);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectionIndicatorsModalComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setFormData() {
    let {
      active,
      created_at,
      id,
      is_global,
      name,
      pathway_content,
      results,
      updated_at,
    } = this.workPackageData;
    console.log(this.workPackageData);
    console.log(name);
    this.createWorkPackageForm.controls['name'].setValue(name);
    this.createWorkPackageForm.controls['pathwayContent'].setValue(pathway_content);
    this.createWorkPackageForm.controls['results'].setValue(results);
    this.createWorkPackageForm.controls['isGlobal'].setValue(is_global);
  }
}
