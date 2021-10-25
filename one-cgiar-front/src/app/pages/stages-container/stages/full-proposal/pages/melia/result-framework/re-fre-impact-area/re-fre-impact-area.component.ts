import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { ReFreDataControlService } from './services/re-fre-data-control.service';

@Component({
  selector: 'app-re-fre-impact-area',
  templateUrl: './re-fre-impact-area.component.html',
  styleUrls: ['./re-fre-impact-area.component.scss']
})
export class ReFreImpactAreaComponent implements OnInit {
  routes= [
    {
      route:'table-a',
      title:'Table A',
      complete:true
    },   
    {
      route:'table-b',
      title:'Table B',
      complete:false
    },   
    {
      route:'table-c',
      title:'Table C',
      complete:false
    }
  ]
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private _initiativesService:InitiativesService,
    private _reFreDataControlService:ReFreDataControlService
    ) { }

  ngOnInit(): void {
    this.detectRoute();
  }

  detectRoute(){
    let reload = false;
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this._reFreDataControlService.impactAreaID = routeResp.impactAreaID
      // this.pobIaID = routeResp.pobIaID;
      // this.getProjectedBenefitLists(this.pobIaID)
      console.log(routeResp);
      if (reload){
        this.reloadComponent();
      }
      


      reload = true;
    })
  }



  reloadComponent(){
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/melia/result-framework`])
    setTimeout(() => {
      this.router.navigate([currentRoute])
    }, 10);
    
    console.log("Reload");
  }

}
