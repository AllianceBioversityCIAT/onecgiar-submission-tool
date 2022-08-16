import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../../../../../../shared/services/utils.service';
import { PusherService } from '../../../../../../../../shared/services/pusher.service';

@Component({
  selector: 'app-ta-impact-area',
  templateUrl: './ta-impact-area.component.html',
  styleUrls: ['./ta-impact-area.component.scss']
})
export class TaImpactAreaComponent implements OnInit {
  tableAData:tableAData;
  currentImpactAreaId: number;
  // htmlText = ' <p>The following information is in read mode . Please refer to the <a target="_blank" href="https://toc.mel.cgiar.org">theory of change platform</a> and the <a target="_blank" href="https://docs.google.com/document/d/1s6SVqaFhbme2l-iAyvuOPggY9sjhBeYl/edit">MELIA Guidance</a> to edit it.</p>'
  
  constructor(
    private _initiativesService:InitiativesService,
    private activatedRoute:ActivatedRoute,
    public _utilsService:UtilsService,
    private _pusherService:PusherService
    ) { }

  ngOnInit(): void {
    this._initiativesService.setTitle('Table A');
    this.activatedRouteSubsription();


    this._pusherService.listenTocChange('table-a',()=>{
    },this.currentImpactAreaId);
  }

  activatedRouteSubsription(){
    
    this.activatedRoute.params.subscribe((routeResp: any) => {
      this.currentImpactAreaId = routeResp.id;
      this._initiativesService.getMeliaResultFramework().pipe(
        map(res=>res.response.melia.resultFramework.tableA),
        map((res:tableAData)=>{
          res.global_targets = res?.global_targets?.filter(item=>item.impact_area_id == routeResp.id);
          res.impact_areas_indicators = res.impact_areas_indicators?.filter(item=>item.impact_area_id == routeResp.id);
          res.sdg_targets = res.sdg_targets?.filter(item=>item.impact_area_id == routeResp.id);
          return res
        })
        ).subscribe((resp:tableAData)=>{
        this.tableAData = resp;
      })
    });
  
  }


}



interface tableAData {
  global_targets: GlobalTarget[];
  impact_areas_indicators: ImpactAreasIndicator[];
  sdg_targets: SdgTarget[];
  updated_at: Array<{udate_at:string}>
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