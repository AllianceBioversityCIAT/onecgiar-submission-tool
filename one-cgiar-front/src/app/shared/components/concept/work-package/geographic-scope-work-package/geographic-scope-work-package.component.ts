import { Component, OnInit, OnDestroy } from '@angular/core';
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
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    private _interactionsService:InteractionsService
  ) { 
    this.workPackageForm = new FormGroup({
      isGlobal: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getRegionsAndCountries();
      this._initiativesService.getWorkPackageById(this._dataControlService.WorkPackageID).subscribe(resp=>{
        this.setIsGlobal(resp.response.workPackage.is_global);        
      })

    this._dataControlService.countriesAndRegionsloaded$.subscribe(()=>{
    })
  }

  saveGeographicScope(){
    this._initiativesService.updateWorkPackage({id:this._dataControlService.WorkPackageID,isGlobal:this.workPackageForm.value.isGlobal}).subscribe(resp=>{
      this.saveEachRegionAndCountries();
    });
  }

  
  saveEachRegionAndCountries(){
    console.log("guardando: regions an countries");
    console.log(this.regionsSelectedList);
    console.log(this.countriesSelectedList);
    for (const region of this.regionsSelectedList) {
      if (region.new){
        let body;
        body = region;
        body.wrkPkgId = this._dataControlService.WorkPackageID;
        body.regionId = body.code;
       this._initiativesService.createRegion(body).subscribe(resp=>{
         console.log('%ccreateRegion','background: #222; color: #37ff73');
         console.log(resp);
       })
      }
    }

    // for (const countrie of this.countriesSelectedList) {
    //   let body;
    //   body = countrie;
    //   body.wrkPkgId = this._dataControlService.WorkPackageID
    //   body.countryId = body.code;
    //   if (countrie.new){
    //    this._initiativesService.createCountrie(body).subscribe(resp=>{
    //    })
    //   }
    // }
  
    this._interactionsService.successMessage('Geographic scope information has been saved',1000)

  }

  setIsGlobal(value){
    this.workPackageForm.controls['isGlobal'].setValue(value);
  }

  getRegionsAndCountries(){

    this._initiativesService.getRegionsAndCountries(this._dataControlService.WorkPackageID).subscribe(resp=>{
      this.showForm = true;
      this.regionsSelectedList = resp.response.regions;
      this.countriesSelectedList = resp.response.countries;
      console.log('%cgetRegionsAndCountries','background: #222; color: #37ff73');
      console.log(this.regionsSelectedList);

      // this.regionsSelectedList.map(region=>{region.regionId = region.code});
      // this.countriesSelectedList.map(county=>county.countryId = county.code);

    })
    
  }





}
