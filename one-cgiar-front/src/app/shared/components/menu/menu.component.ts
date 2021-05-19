import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsHandler } from '@shared/utils/utils';
import { InitiativesService } from '@shared/services/initiatives.service';
import { RequestsService } from '@shared/services/requests.service';
import { StagesMenuService } from '@shared/services/stages-menu.service';
import { InteractionsService } from '../../services/interactions.service';
import { group } from '@angular/animations';
import { DataControlService } from '../../services/data-control.service';


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
  workPackagesList: any = [];
  // stageUrl;
  constructor(
    public _requests: RequestsService,
    public router: Router,
    public initiativesSvc: InitiativesService,
    public stgMenuSvc: StagesMenuService,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.getStages();
    this._dataControlService.menuChange$.subscribe(() => {
      this.getAllIWorkPackages();
    })
    this._dataControlService.menuChange$.emit();
    this.stgMenuSvc.menu.subscribe(
      menu => {
        this.subMenusFormValidation = menu;
      }
    )
  }

  goToWp(id) {
    let currentUrl = this.router.url;
    this.router.navigateByUrl(`/initiatives/${this.initiativesSvc.initvStgId}/stages/concept/work-package`, { skipLocationChange: true }).then(() => {
      this.router.navigate([`/initiatives/${this.initiativesSvc.initvStgId}/stages/concept/work-package/` + id]);
    });
  }



  getStages() {
    this.initiativesSvc.getStages()
      .subscribe(
        res => {
          // console.log(res);
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

  navigateTo(meta: any, section: string) {
    // if(section != 'Key partners'){
    this.router.navigate([this.parseStageUrl(meta, section)]);
    // }else{
    //   this._interactionsService.openSnackBarPosition('Section under construction','Ok')
    // }

  }

  validateSubMenuForm(stageName: any, subMenu: string) {
    stageName = stageName.toLowerCase().split(' ').join('_');
    subMenu = subMenu.toLowerCase().split(' ').join('_');
    // console.log(stageName, subMenu, this.subMenusFormValidation)
    return this.subMenusFormValidation[stageName][subMenu];
  }

  validate_under_construction(section) {
    switch (section) {
      case 'Work packages':
        return true
      case 'Key partners':
        return true
      default:
        return false
    }
  }

  getAllIWorkPackages() {
    // this.spinnerService.show('work-packages');
    this.initiativesSvc.getAllIWorkPackages(this.initiativesSvc.initvStgId).subscribe(resp => {
      //  console.log("getAllIWorkPackages");
      this.workPackagesList = resp.response.workPackages;
      // console.log( this.workPackagesList);
    },
      err => {
        // this.spinnerService.hide('work-packages');
      },
      () => {
        // this.spinnerService.hide('work-packages');
      })
    // this.validateWorkPackages();
  }
}
