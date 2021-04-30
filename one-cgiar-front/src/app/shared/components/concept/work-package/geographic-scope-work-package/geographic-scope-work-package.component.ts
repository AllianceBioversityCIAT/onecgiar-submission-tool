import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';
import { DataControlService } from '../../../../services/data-control.service';
import { InteractionsService } from '../../../../services/interactions.service';

@Component({
  selector: 'app-geographic-scope-work-package',
  templateUrl: './geographic-scope-work-package.component.html',
  styleUrls: ['./geographic-scope-work-package.component.scss']
})
export class GeographicScopeWorkPackageComponent implements OnInit {
  regionsSelectedList=[];
  countriesSelectedList=[];
  workPackageForm: FormGroup;
  showForm=false;
  constructor(
    private _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    private _interactionsService:InteractionsService
  ) { 
    this.workPackageForm = new FormGroup({
      isGlobal: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getRegionsAndCountries();
    this._dataControlService.WorkPackageReloaded$.subscribe(()=>{
      this._initiativesService.getWorkPackageById(this._dataControlService.WorkPackageID).subscribe(resp=>{
        console.log("is_global");
        console.log(resp.response.workPackage.is_global); 
       
        this.setIsGlobal(resp.response.workPackage.is_global);
        
        this.showForm = false;
        setTimeout(() => {
          this.showForm = true;
        }, 1);
        
      })
    })
    this._dataControlService.WorkPackageReloaded$.emit();
    this._dataControlService.countriesAndRegionsloaded$.subscribe(()=>{
      this.mapNamesOfRegionsAndCountries();
    })
  }

  saveGeographicScope(){
    this._initiativesService.updateWorkPackage({id:this._dataControlService.WorkPackageID,isGlobal:this.workPackageForm.value.isGlobal}).subscribe(resp=>{
      this.saveEachRegionAndCountries();
    });
  }

  
  saveEachRegionAndCountries(){
    for (const region of this.regionsSelectedList) {
      let body;
      body = region;
      body.wrkPkgId = this._dataControlService.WorkPackageID
      body.regionId = body.um49Code;
      if (region.new){
       this._initiativesService.createRegion(body).subscribe(resp=>{
       })
      }
    }

    for (const countrie of this.countriesSelectedList) {
      let body;
      body = countrie;
      body.wrkPkgId = this._dataControlService.WorkPackageID
      body.countryId = body.code;
      if (countrie.new){
       this._initiativesService.createCountrie(body).subscribe(resp=>{
       })
      }
    }
  
    this._interactionsService.successMessage('Geographic scope information has been saved')

  }

  setIsGlobal(value){
    this.workPackageForm.controls['isGlobal'].setValue(value);
  }

  mapNamesOfRegionsAndCountries(){

    for (const countrySelected of this.countriesSelectedList) {
      countrySelected.code = countrySelected.country_id;
      for (const countrieFull of this._dataControlService.countriesList) {
        if(countrySelected.country_id == countrieFull.code){
          countrySelected.name = countrieFull.name;
        }
      }
    }

    for (const regionSelected of this.regionsSelectedList) {
      regionSelected.um49Code = regionSelected.region_id;
      for (const regionFull of this._dataControlService.regionsList) {
        if(regionSelected.um49Code == regionFull.um49Code){
          regionSelected.name = regionFull.name;
        }
      }
    }

  }

  
  getRegionsAndCountries(){

    this._initiativesService.getRegionsAndCountries(this._dataControlService.WorkPackageID).subscribe(resp=>{
      this.showForm = true;
      this.regionsSelectedList = resp.response.regions;
      this.countriesSelectedList = resp.response.countries;
    })
    
  }





}
