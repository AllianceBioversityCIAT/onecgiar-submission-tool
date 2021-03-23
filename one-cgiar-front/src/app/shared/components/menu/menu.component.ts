import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsHandler } from '@shared/utils/utils';
import { InitiativesService } from '@shared/services/initiatives.service';
import { RequestsService } from '@shared/services/requests.service';
import { StagesMenuService } from '@shared/services/stages-menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  stages: [];
  stages_meta: [];
  utilsHandler = new UtilsHandler();
  subMenusFormValidation: {};
  // stageUrl;
  constructor(public _requests: RequestsService, public router: Router, public initiativesSvc: InitiativesService, public stgMenuSvc: StagesMenuService) { }

  ngOnInit(): void {
    this.getStages();
    this.stgMenuSvc.menu.subscribe(
      menu => {
        this.subMenusFormValidation = menu;
      }
    )
  }

  getStages() {
    this.initiativesSvc.getStages()
      .subscribe(
        res => {

          res.stages.map(stage => {
            stage.groups = [];
            res.stagesMeta.forEach(meta => {
              if (meta.stage_name == stage.description)
                stage.groups.push(meta)
            });
            // stage.grouped = this.utilsHandler.groupData(stage.groups)
            stage.grouped = this.utilsHandler.groupByProp(stage.groups, 'group_by');
            // stage.grouped = stage.grouped
          })
          this.stages = res.stages;
          // console.log(this.stages)
        }
      )
  }

  parseStageUrl(meta: any, section: string) {
    const snapshot = this.router.routerState.snapshot;
    const baseUrl = snapshot.url.substring(0, snapshot.url.indexOf('stages/')) + 'stages/';
    const stage = meta.description.toLowerCase().split(' ').join('-');
    return `${baseUrl}${stage}/${section.toLowerCase().split(' ').join('-')}`
  }

  validateSubMenuForm(stageName: any, subMenu: string) {
    stageName = stageName.toLowerCase().split(' ').join('_');
    subMenu = subMenu.toLowerCase().split(' ').join('_');
    // console.log(stageName, subMenu, this.subMenusFormValidation)
    return this.subMenusFormValidation[stageName][subMenu];
  }



}
