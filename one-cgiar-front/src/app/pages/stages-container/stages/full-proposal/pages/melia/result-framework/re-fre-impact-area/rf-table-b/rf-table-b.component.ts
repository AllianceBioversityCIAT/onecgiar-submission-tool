import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { ReFreDataControlService } from '../services/re-fre-data-control.service';

@Component({
  selector: 'app-rf-table-b',
  templateUrl: './rf-table-b.component.html',
  styleUrls: ['./rf-table-b.component.scss']
})
export class RfTableBComponent implements OnInit {
  outcomesIndicatorsList:[];
  outcomesIndicatorsIsLoaded=false;
  constructor(
    public _initiativesService:InitiativesService,
    private _reFreDataControlService:ReFreDataControlService
  ) { }

  ngOnInit(): void {
    // this.getProjectedBenefitLists(this._reFreDataControlService.impactAreaID);
    this.getOutcomesIndicators();
  }

  getOutcomesIndicators(){
    this._initiativesService.getOutcomesIndicators().subscribe(resp=>{
      this.outcomesIndicatorsList = resp.response.outcomesIndicators;
      console.log(resp.response.outcomesIndicators);
      this.outcomesIndicatorsIsLoaded =  true;
    })
  }

  // getProjectedBenefitLists(impactAreaId){
  //   this._initiativesService.getProjectedBenefitLists().subscribe(resp=>{
  //     // console.log("getProjectedBenefitLists");
  //     // console.log(resp);
      
  //     this.indicatorsList = resp.response.impactProjectedBenefitsRequested.filter(item=>item.impactAreaId == impactAreaId && item.isApplicableProjectedBenefits == true);
  //     console.log(this.indicatorsList);
  //   },err=>{},()=>this.indicatorsListLoaded =  true)
    
  // }

}
