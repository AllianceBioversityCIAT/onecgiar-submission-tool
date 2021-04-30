import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionsService } from '../../../services/interactions.service';
import { DataControlService } from '../../../services/data-control.service';
@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','validateGeneralInformation','validateGeographicScope','validateProjectionBenefits'];
  workPackagesList=[];
  noWp = true;
  regionsList=[];
  countriesList=[];
  constructor(
    public _initiativesService: InitiativesService,
    private spinnerService: NgxSpinnerService,
    public stgMenuSvc: StagesMenuService, 
    public _interactionsService:InteractionsService,
    public _dataControlService:DataControlService
   ) {
  }

  ngOnInit(): void {

      this.getCLARISARegionsByPage();
      this.getAllIWorkPackages();
      this.getCLARISACountriesByPage();

  }

  getCLARISARegionsByPage(){
    this._initiativesService.getCLARISARegionsByPage().subscribe(resp=>{
      console.log('%cCLARISA regions','background: #222; color: #ffff00');
      console.log(resp);
      this.regionsList = resp.response.regions;
    })
  }

  getCLARISACountriesByPage(){
    this._initiativesService.getCLARISACountriesByPage().subscribe(resp=>{
      console.log('%cCLARISA countriesList','background: #222; color: #ffff00');
      console.log(resp);
      this.countriesList = resp.response.countries;
    },
    err=>{

    })
  }



  getAllIWorkPackages(){
    let suscrip = this._initiativesService.getAllIWorkPackages(this._initiativesService.initvStgId).subscribe(resp => {
      this.noWp  = false;  
      this.workPackagesList = resp.response.workPackages;
    },
    err=>{
      this.noWp  = true;     
      suscrip.unsubscribe();
    },
    ()=>{
      suscrip.unsubscribe();
    })
      this.validateWorkPackages();
  }

  addWorkPackage(){
    this.spinnerService.show('work-packages');
    this._initiativesService.createWorkPackage({"initvStgId": this._initiativesService.initvStgId}).subscribe(resp=>{
      console.log(resp);
      this.noWp  = false;
      this.getAllIWorkPackages();
      this._interactionsService.successMessage("Work package successfully added");
      this._dataControlService.menuChange$.emit();
    },
    err=>{
      this._interactionsService.errorMessage("Error");
    },
    ()=>{
      this.spinnerService.hide('work-packages');
    })
    
  }

  validateWorkPackages(){
    let formValid = true;
    for (const workPackage of this.workPackagesList) {
      if(workPackage.formValid == false){
        formValid = false;
      }
    }
    this.stgMenuSvc.setFormStageStatus('concept', 'work_packages', formValid?'VALID':'INVALID', this._initiativesService.initvStgId);
  }

}
