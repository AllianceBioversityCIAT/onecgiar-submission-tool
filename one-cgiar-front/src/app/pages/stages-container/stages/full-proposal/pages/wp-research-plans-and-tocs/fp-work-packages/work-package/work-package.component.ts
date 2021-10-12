import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';
import { InteractionsService } from '../../../../../../../../shared/services/interactions.service';

@Component({
  selector: 'app-work-package',
  templateUrl: './work-package.component.html',
  styleUrls: ['./work-package.component.scss']
})
export class WorkPackageComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
    private _dataControlService:DataControlService,
    private _interactionsService: InteractionsService
  ) {
    this.workPackageForm = new FormGroup({
      acronym: new FormControl(null),
      name: new FormControl(null),
      pathway_content: new FormControl(null),
      is_global: new FormControl(true),
      id: new FormControl(null),
    });


  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log(this.iaID);
    if (this.wpID) {
      this.wpColorselected(3, 5, 12, this.wpID);
    }
    
  }

  wpColorselected(stageId, sectionId, subSectionId, wpId){
    // select all wp 
    let allWp = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)
    .sections.find((section) => section.sectionId == sectionId)
    .subsections.find((subSection) => subSection.subSectionId == subSectionId)
    .dynamicList
    // clean wp activeSection attribute
    allWp.map(wp=>wp.activeSection = false)
    // select current wp
    if (wpId != -1) {
      let sectionFinded = allWp.find((wp) => wp.id == wpId).activeSection = true;
      // console.log(sectionFinded);
    }
    // console.log(allWp);
     
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.wpColorselected(3, 5, 12,-1)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeResp: any) => {
      // Add activeSection = true if is the current wp open
      // this.wpColorselected(3, 5, 12,routeResp.wpID);
      this.wpID = routeResp.wpID

      // console.log(this._dataControlService.userMenu);
      this._initiativesService.getWpFpByInititative(routeResp.wpID).subscribe(resp => {
        let directResp = resp.response.workpackage;
        this.geographicScope.regions = directResp.regions;
        this.geographicScope.countries = directResp.countries;
        this.updateFields(directResp,routeResp.wpID);
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
        // console.log(directResp);
      })

      // console.log(resp.wpID);
    });


  }

  updateWp(){
    let body = this.workPackageForm.value;
    body.regions = this.geographicScope.regions;
    body.countries = this.geographicScope.countries;
    body.regions.map(resp=>resp.wrkPkg = Number(this.workPackageForm.value.id));
    body.countries.map(resp=>resp.wrkPkg = Number(this.workPackageForm.value.id));
    // console.log(body);
    this._initiativesService.saveWpFp(body,this._initiativesService.initiative.id).subscribe(resp=>{
      // console.log(resp);
      // console.log(this.workPackageForm.valid?true:false);
      this.workPackageForm.valid?
      this._interactionsService.successMessage('Work package has been saved'):
      this._interactionsService.warningMessage('Work package has been saved, but there are incomplete fields')
    })
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
