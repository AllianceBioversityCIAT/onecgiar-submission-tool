import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../../shared/services/initiatives.service';
import { ReFreDataControlService } from '../services/re-fre-data-control.service';

@Component({
  selector: 'app-rf-table-a',
  templateUrl: './rf-table-a.component.html',
  styleUrls: ['./rf-table-a.component.scss']
})
export class RfTableAComponent implements OnInit {
  indicatorsList:[];
  indicatorsListLoaded=false;
  constructor(
    public _initiativesService:InitiativesService,
    private _reFreDataControlService:ReFreDataControlService
  ) { }

  ngOnInit(): void {
    this.getProjectedBenefitLists(this._reFreDataControlService.impactAreaID);
  }

  getProjectedBenefitLists(impactAreaId){
    this._initiativesService.getProjectedBenefitLists().subscribe(resp=>{
      // console.log("getProjectedBenefitLists");
      // console.log(resp);
      
      this.indicatorsList = resp.response.impactProjectedBenefitsRequested.filter(item=>item.impactAreaId == impactAreaId && item.isApplicableProjectedBenefits == true);
      console.log(this.indicatorsList);
    },err=>{},()=>this.indicatorsListLoaded =  true)
    
  }

}
