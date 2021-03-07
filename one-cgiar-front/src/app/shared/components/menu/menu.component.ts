import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsHandler } from '@shared/utils/utils';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  stages: [];
  stages_meta: [];
  utilsHandler = new UtilsHandler();
  // stageUrl;
  constructor(public _requests: RequestsService, public router: Router, public initiativesSvc: InitiativesService) { }

  ngOnInit(): void {
    this.getStages();
  }

  getStages() {
    this.initiativesSvc.getStages()
      .subscribe(
        res => {

          // console.log(this.activatedRoute.toString())

          res.stages.map(stage => {
            stage.groups = [];
            res.stages_meta.forEach(meta => {
              if (meta.stage_name == stage.description)
                stage.groups.push(meta)
            });
            stage.grouped = this.utilsHandler.groupByProp(stage.groups, 'group_by')
          })
          this.stages = res.stages;
          // this.stages_meta = res.stages_meta
        }
      )
  }

  parseStageUrl(meta: any) {
    const snapshot = this.router.routerState.snapshot;
    const baseUrl = snapshot.url.substring(0, snapshot.url.indexOf('stages/')) +'stages/';
    const stage = meta.value[0].stage_name.toLowerCase().split(' ').join('-');
    const section =  meta.key.toLowerCase().split(' ').join('-');
    return `${baseUrl}${stage}/${section}`
  }

}
