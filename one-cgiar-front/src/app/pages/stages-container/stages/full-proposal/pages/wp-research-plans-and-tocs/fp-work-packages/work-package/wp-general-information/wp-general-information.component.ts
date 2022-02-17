import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WpDataControlService } from '../../services/wp-data-control.service';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../../shared/services/data-control.service';
import { InteractionsService } from '../../../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-wp-general-information',
  templateUrl: './wp-general-information.component.html',
  styleUrls: ['./wp-general-information.component.scss']
})
export class WpGeneralInformationComponent implements OnInit {

  firstTab = true;
  showForm = false;
  workPackageForm: FormGroup;
  wpID;
  geographicScope = {
    regions: [],
    countries: []
  }
  constructor(
    public _initiativesService: InitiativesService,
    private _dataControlService:DataControlService,
    private _interactionsService: InteractionsService,
    private _wpDataControlService:WpDataControlService,
    private router:Router
  ) {
    this.workPackageForm = new FormGroup({
      acronym: new FormControl(null),
      name: new FormControl(null),
      pathway_content: new FormControl(null),
      is_global: new FormControl(true),
      id: new FormControl(null),
      active: new FormControl(true),
    });


  }

  ngOnInit(): void {
  
      // Add activeSection = true if is the current wp open
      // this.wpColorselected(3, 5, 12,routeResp.wpID);
      //console.log(this._wpDataControlService.wpId);
      this.wpID = this._wpDataControlService.wpId 

      this._initiativesService.getWpById(this._wpDataControlService.wpId, 'proposal').subscribe(resp => {
        let directResp = resp.response.workpackage;
        //console.log(directResp);
        this.geographicScope.regions = directResp.regions;
        this.geographicScope.countries = directResp.countries;
        this.updateFields(directResp,this._wpDataControlService.wpId);
        this._initiativesService.getCLARISARegions('').subscribe(regions=>{
          this.geographicScope.regions.map(mapReg=>{
            regions.response.regions.forEach(regionItem=>{
              if (regionItem.id == mapReg.region_id) mapReg.name = regionItem.name;
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
        // console.log(directResp);
      })

      // console.log(resp.wpID);
    


  }

  updateWp(){
    let body = this.workPackageForm.value;
    body.regions = this.geographicScope.regions;
    body.countries = this.geographicScope.countries;
    body.regions.map(resp=>resp.wrkPkg = Number(this.workPackageForm.value.id));
    body.countries.map(resp=>resp.wrkPkg = Number(this.workPackageForm.value.id));
    console.log(body);
    this._initiativesService.saveWpFp(body,this._initiativesService.initiative.id).subscribe(resp=>{
      // console.log(resp);
      // console.log(this.workPackageForm.valid?true:false);
      this.workPackageForm.valid?
      this._interactionsService.successMessage('Work package has been saved'):
      this._interactionsService.warningMessage('Work package has been saved, but there are incomplete fields')
      this.reloadComponent();

    })
  }

  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/work-package-research-plans-and-tocs/work-packages/work-package`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
    //console.log("Reload");
  }

  updateFields(directResp,id:number){
        // console.log(id);
        this.workPackageForm.controls['acronym'].setValue(directResp.acronym);
        this.workPackageForm.controls['name'].setValue(directResp.name);
        this.workPackageForm.controls['pathway_content'].setValue(directResp.pathway_content);
        this.workPackageForm.controls['is_global'].setValue(directResp.is_global);
        this.workPackageForm.controls['id'].setValue(Number(id));
        this.showForm = false;
        setTimeout(() => {
          this.showForm = true;
        }, 100);
        
  }

}
