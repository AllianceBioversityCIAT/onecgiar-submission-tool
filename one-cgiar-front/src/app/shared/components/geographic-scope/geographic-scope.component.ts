import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClarisaService } from '@app/shared/services/clarisa.service';
import { DataControlService } from '@app/shared/services/data-control.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';

@Component({
  selector: 'app-geographic-scope',
  templateUrl: './geographic-scope.component.html',
  styleUrls: ['./geographic-scope.component.scss']
})
export class GeographicScopeComponent implements OnInit {
  @Input() regionsSelectedList=[];
  @Input() countriesSelectedList=[];

  
  workPackageForm: FormGroup;
  showForm=false;
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    private _interactionsService:InteractionsService,
    public _clarisaService:ClarisaService
  ) { 
    this.workPackageForm = new FormGroup({
      isGlobal: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this._dataControlService.countriesAndRegionsloaded$.subscribe(()=>{
    })
  }

  saveGeographicScope(){
    this._initiativesService.updateWorkPackage({id:this._dataControlService.WorkPackageID,isGlobal:this.workPackageForm.value.isGlobal}).subscribe(resp=>{
      this.saveEachRegionAndCountries();
    });
  }

  
  saveEachRegionAndCountries(){
    for (const region of this.regionsSelectedList) {
      if (region.new){
        let body;
        body = region;
        body.wrkPkgId = this._dataControlService.WorkPackageID;
        body.regionId = body.um49Code;
        console.log(body);
       this._initiativesService.createRegion(body).subscribe(resp=>{
         console.log('%ccreateRegion','background: #222; color: #37ff73');
         console.log(resp);
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
  
    this._interactionsService.successMessage('Geographic scope information has been saved',1000)

  }

  setIsGlobal(value){
    this.workPackageForm.controls['isGlobal'].setValue(value);
  }

}
