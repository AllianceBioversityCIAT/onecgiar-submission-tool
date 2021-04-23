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
  regionsSelectedList: any = [];
  countriesSelectedList:any = [];
  @Input() workPackageData: any;
  @Input() workPackagesList: any;
  @Input() index: any;
  @Input() regionsList: any [];
  @Input() countriesList: any [];
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
      isGlobal: new FormControl(null, Validators.required),
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
    this.initiativesSvc.getRegionsAndCountries(this.workPackageData?.id).subscribe(resp=>{
      console.log(resp.response.regions);
      this.regionsSelectedList = resp.response.regions;
      for (const regionSelected of this.regionsSelectedList) {
        regionSelected.um49Code = regionSelected.region_id;
        for (const regionFull of this.regionsList) {
          if(regionSelected.um49Code == regionFull.um49Code){
            regionSelected.name = regionFull.name;
          }
        
        }
      }
      console.log(resp.response.countries);
      this.countriesSelectedList = resp.response.countries;
    })
  }

  SaveGeneralInformation(): void {
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
    // this.globalDimension = is_global;
    this.createWorkPackageForm.controls['isGlobal'].setValue(is_global);
    this.createWorkPackageForm.controls['id'].setValue(id);
  }

  saveGeographicScope(){
    console.log(this.regionsSelectedList);
    this.initiativesSvc.updateWorkPackage({id:this.workPackageData.id,isGlobal:this.createWorkPackageForm.value.isGlobal}).subscribe(resp=>{
      console.log(resp);
      this.saveEachRegionAndCountries();
    });
  }

  saveEachRegionAndCountries(){

    console.log('%cGuardando','background: #222; color: #ffff00');
    for (const region of this.regionsSelectedList) {
      console.log(region);
      let body;
      body = region;
      body.wrkPkgId =this.workPackageData.id
      body.regionId = body.um49Code;
      if (region.new){
       console.log("Se guarda "+region.name);
       this.initiativesSvc.createRegion(body).subscribe(resp=>{
       console.log(resp);
      })
      }else{
        console.log("No se guarda "+region.name);
      }
    }
  

  }

  setIsGlobal(value){
    this.createWorkPackageForm.controls['isGlobal'].setValue(value);
  }


}
