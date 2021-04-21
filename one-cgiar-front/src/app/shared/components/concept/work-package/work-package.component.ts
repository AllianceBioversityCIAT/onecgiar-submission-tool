import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
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
  showForm=false;
  animationSize=500;
  animationSizeActive=true;
  showform = false;
  regionsSelectedList = [];
  countriesSelectedList = [];
  @Input() workPackageData: any;
  @Input() workPackagesList: any;
  @Input() index: any;
  @Input() regionsList: [];
  @Input() countriesList: [];
  @Output() validateAllWP = new EventEmitter();
  workPackageId: number | string;
  initiativeId: any;
  public initvStgId: any;
  public createWorkPackageForm: FormGroup;
  panelOpenState = false;
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range
    .value;

  constructor(
    public _requests: RequestsService,
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
    this.getRegionsAndCountries();

    this.showform = true;
    // this.initiativesSvc.getCLARISARegionsByPage(1).subscribe(resp=>{
    //   console.log('%cCLARISA regions','background: #222; color: #ffff00');
    //   console.log(resp);
    //   this.regionsList = resp.response.regions;
    //   this.showForm=true;
    //   setInterval(()=>{
    //      console.log("Hello"); 
    //     this.regionsList.push({name:'test'})
    //     }, 3000);
    // })
    this.setFormData();
    if (!this.workPackageData.name) {
      this.animationSizeActive=false;
    }
    this.workPackagesList[this.index].formValid=this.createWorkPackageForm.invalid?false:true;

    this.createWorkPackageForm.valueChanges.subscribe(
      result => {
        this.workPackagesList[this.index].formValid=this.createWorkPackageForm.invalid?false:true;
        this.validateAllWP.emit();
      }
    );
  }

  getRegionsAndCountries(){
    this.initiativesSvc.getRegionsAndCountries(1).subscribe(resp=>{
      console.log(resp);
      this.regionsSelectedList = resp.response.regions;
      this.countriesSelectedList = resp.response.countries;
    })
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
