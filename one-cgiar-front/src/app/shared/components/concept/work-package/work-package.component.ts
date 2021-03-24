import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectionIndicatorsModalComponent } from '@app/shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionsService } from '../../../services/interactions.service';

@Component({
  selector: 'app-work-package',
  templateUrl: './work-package.component.html',
  styleUrls: ['./work-package.component.scss'],
})
export class WorkPackageComponent implements OnInit {
  animationSize=500;
  animationSizeActive=true;
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
    public initiativesSvc: InitiativesService,
    private interactionsService:InteractionsService
  ) {
    this.createWorkPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      // isGlobal: new FormControl(true, Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.setFormData();
    if (!this.workPackageData.name) {
      this.animationSizeActive=false;
      console.log('%cfalse','background: #222; color: #ffff00');
    }
  }

  onUpdate(): void {
    console.log('%cReady to update','background: #222; color: #ffff00');
    console.log(  this.createWorkPackageForm);
    this.initiativesSvc.updateWorkPackage(this.createWorkPackageForm.value).subscribe(resp=>{
      this.interactionsService.successMessage('Work package ' +this.createWorkPackageForm.value.name+ ' information has been saved')
      console.log(resp);
    });
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
    this.createWorkPackageForm.controls['name'].setValue(name);
    this.createWorkPackageForm.controls['pathwayContent'].setValue(pathway_content);
    this.createWorkPackageForm.controls['results'].setValue(results);
    // this.createWorkPackageForm.controls['isGlobal'].setValue(is_global);
    this.createWorkPackageForm.controls['id'].setValue(id);
  }

}
