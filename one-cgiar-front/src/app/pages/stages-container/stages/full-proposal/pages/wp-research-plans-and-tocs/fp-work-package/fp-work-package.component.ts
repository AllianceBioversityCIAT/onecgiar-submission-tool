import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-fp-work-package',
  templateUrl: './fp-work-package.component.html',
  styleUrls: ['./fp-work-package.component.scss']
})
export class FpWorkPackageComponent implements OnInit {
  showForm = false;
  workPackageForm: FormGroup;
  geographicScope = {
    regions: [],
    countries: []
  }
  constructor(
    public _initiativesService: InitiativesService,
    private activatedRoute: ActivatedRoute,
    private _dataControlService:DataControlService
  ) {
    this.workPackageForm = new FormGroup({
      acronym: new FormControl(null),
      name: new FormControl(null),
      pathway_content: new FormControl(null),
      is_global: new FormControl(true),
    });


  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((resp: any) => {
      this._initiativesService.getWpFpByInititative(resp.wpID).subscribe(resp => {
        let directResp = resp.response.workpackage;
        this.geographicScope.regions = directResp.regions;
        this.geographicScope.countries = directResp.countries;
        this.updateFields(directResp);
        this._initiativesService.getCLARISARegions('').subscribe(regions=>{
          this.geographicScope.regions.map(mapReg=>{
            regions.response.regions.forEach(regionItem=>{
              if (regionItem.um49Code == mapReg.region_id) mapReg.name = regionItem.name;
            })
          })
          this._dataControlService.showRegions = true;
        })
  
        this._initiativesService.getCLARISACountries().subscribe(countries=>{       
          this.geographicScope.countries.map(mapCoun=>{
            countries.response.countries.forEach(countryItem=>{
              if (countryItem.code == mapCoun.country_id) mapCoun.name = countryItem.name;
            })
            
          })
          this._dataControlService.showCountries = true;
        })
        console.log(directResp);
      })

      console.log(resp.wpID);
    });


  }

  updateFields(directResp){
        this.workPackageForm.controls['acronym'].setValue(directResp.acronym);
        this.workPackageForm.controls['name'].setValue(directResp.name);
        this.workPackageForm.controls['pathway_content'].setValue(directResp.pathway_content);
        this.showForm = false;
        setTimeout(() => {
          this.showForm = true;
        }, 100);
        
  }

}
