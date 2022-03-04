import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ta-impact-area',
  templateUrl: './ta-impact-area.component.html',
  styleUrls: ['./ta-impact-area.component.scss']
})
export class TaImpactAreaComponent implements OnInit {
  tableAData:tableAData;
  currentImpactAreaId: number;
  constructor( 
    private _initiativesService:InitiativesService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRouteSubsription();

  }

  activatedRouteSubsription(){
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.currentImpactAreaId = routeResp.id;
      this._initiativesService.getMeliaResultFramework(this._initiativesService.initiative.id).pipe(
        map(res=>res.response.melia.resultFramework.tableA),
        map((res:tableAData)=>{
          res.globalTargets = res.globalTargets.filter(item=>item.impact_area_id == routeResp.id);
          res.impactAreasIndicators = res.impactAreasIndicators.filter(item=>item.impact_area_id == routeResp.id);
          res.sdgTargets = res.sdgTargets.filter(item=>item.impact_area_id == routeResp.id);
          return res
        })
        ).subscribe((resp:tableAData)=>{
        this.tableAData = resp;
        // console.log(this.tableAData)
      })
    });
  
  }


}



interface tableAData {
  globalTargets: GlobalTarget[];
  impactAreasIndicators: ImpactAreasIndicator[];
  sdgTargets: SdgTarget[];
}

interface SdgTarget {
  initvStgId: number;
  id: number;
  sdg_target_id: number;
  sdg_target: string;
  impact_area_id: number;
}

interface ImpactAreasIndicator {
  initvStgId: number;
  id: number;
  impact_indicator_id: number;
  indicatorStatement: string;
  impact_area_id: number;
  active: number;
}

interface GlobalTarget {
  initvStgId: number;
  id: number;
  global_target_id: number;
  target: string;
  active: number;
  impact_area_id: number;
}