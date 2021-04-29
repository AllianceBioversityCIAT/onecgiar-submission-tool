import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-geographic-scope-work-package',
  templateUrl: './geographic-scope-work-package.component.html',
  styleUrls: ['./geographic-scope-work-package.component.scss']
})
export class GeographicScopeWorkPackageComponent implements OnInit {
  regionsSelectedList=[];
  countriesSelectedList=[];
  workPackageForm: FormGroup;
  workPackageData;
  regionsList=[];
  countriesList=[];
  constructor(
    private _initiativesService:InitiativesService
  ) { 
    this.workPackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pathwayContent: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log("helloo geographic-scope");
  }

  saveGeographicScope(){
    console.log(this.regionsSelectedList);
    console.log(this.countriesSelectedList);
    this._initiativesService.updateWorkPackage({id:this.workPackageData.id,isGlobal:this.workPackageForm.value.isGlobal}).subscribe(resp=>{
      this.saveEachRegionAndCountries();
    });
  }

  
  saveEachRegionAndCountries(){
    for (const region of this.regionsSelectedList) {
      let body;
      body = region;
      body.wrkPkgId =this.workPackageData.id
      body.regionId = body.um49Code;
      if (region.new){
       this._initiativesService.createRegion(body).subscribe(resp=>{
       })
      }
    }

    for (const countrie of this.countriesSelectedList) {
      let body;
      body = countrie;
      body.wrkPkgId =this.workPackageData.id
      body.countryId = body.code;
      if (countrie.new){
       this._initiativesService.createCountrie(body).subscribe(resp=>{
       })
      }
    }
  


  }

  setIsGlobal(value){
    this.workPackageForm.controls['isGlobal'].setValue(value);
  }

  
  getRegionsAndCountries(){
    this._initiativesService.getRegionsAndCountries(this.workPackageData?.id).subscribe(resp=>{
      this.regionsSelectedList = resp.response.regions;
      for (const regionSelected of this.regionsSelectedList) {
        regionSelected.um49Code = regionSelected.region_id;
        for (const regionFull of this.regionsList) {
          if(regionSelected.um49Code == regionFull.um49Code){
            regionSelected.name = regionFull.name;
          }
        
        }
      }
      this.countriesSelectedList = resp.response.countries;
      console.log('%casdasd','background: #222; color: #84c3fd');
      
      for (const countrySelected of this.countriesSelectedList) {
        countrySelected.code = countrySelected.country_id;
        for (const countrieFull of this.countriesList) {
          if(countrySelected.country_id == countrieFull.code){
            console.log('%cEcnontrado','background: #222; color: #ffff00');
            countrySelected.name = countrieFull.name;
          }
        
        }
      }
      console.log( this.countriesSelectedList);
    })
  }





}
