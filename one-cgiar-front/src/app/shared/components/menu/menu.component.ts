import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsHandler } from '@shared/utils/utils';
import { InitiativesService } from '@shared/services/initiatives.service';
import { RequestsService } from '@shared/services/requests.service';
import { StagesMenuService } from '@shared/services/stages-menu.service';
import { InteractionsService } from '../../services/interactions.service';
import { group } from '@angular/animations';
import { DataControlService } from '../../services/data-control.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.3s ease-in')),
      transition('expand => collapse', animate('.3s ease-out')),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  state = 'inactive';
  stages: any[];
  stages_meta: [];
  utilsHandler = new UtilsHandler();
  subMenusFormValidation: {};
  workPackagesList: any = [];
  currentStageName = '';
  userMenu = [];
  // stageUrl;
  constructor(
    public _requests: RequestsService,
    public router: Router,
    public initiativesSvc: InitiativesService,
    public stgMenuSvc: StagesMenuService,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService
  ) {}

  ngOnInit(): void {
    let loadMenu$ = this._dataControlService.loadMenu$.subscribe(
      (stageName) => {
        this.currentStageName = stageName;
        loadMenu$.unsubscribe();
      }
    );

    this.getMenu();

    this._dataControlService.menuChange$.subscribe(() => {
      // this.getAllIWorkPackages();
      // console.log('%cgetAllIWorkPackages','background: #222; color: #37ff73');
    });

    this._dataControlService.menuChange$.emit();
    this.stgMenuSvc.menu.subscribe((menu) => {
      this.subMenusFormValidation = menu;
    });
  }

  sortAlphabetically(list,attribute) {
    list.sort(function (a, b) {
      if (a[attribute] < b[attribute]) {
        return -1;
      }
      if (a[attribute]> b[attribute]) {
        return 1;
      }
      return 0;
    });
    return list;
  }

  mapDataInMenu(stageId, sectionId, subSectionId, list) {
    let sectionFinded = (this.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).dynamicList = list);
    // console.log(sectionFinded);
  }

  getMenu() {
    this.initiativesSvc
      .getMenu(this.initiativesSvc.initiative.id)
      .subscribe((userMenuResp: any) => {
        this.userMenu = userMenuResp.response.stages;
        // console.log(this.userMenu);
        // console.log(userMenuResp.response.stages.length);
        if (userMenuResp.response.stages.length > 1) {
          this.initiativesSvc
            .getWpsFpByInititative(this.initiativesSvc.initiative.id)
            .subscribe(
              (wpsResp) => {
                wpsResp.response.workpackage.map((wpResp) => {
                  wpResp.subSectionName = 'work-package';
                  wpResp.showName = wpResp.acronym;
                });
                this.mapDataInMenu(3, 5, 12, wpsResp.response.workpackage);

                let impacAreasQuemados = [
                  {
                    showName: 'Nutrition, health and food security',
                    subSectionName: 'impact-area',
                    id: 1,
                  },
                  {
                    showName: 'Poverty reduction, livelihoods and jobs',
                    subSectionName: 'impact-area',
                    id: 2,
                  },
                  {
                    showName: 'Gender equality, youth and social inclusion',
                    subSectionName: 'impact-area',
                    id: 3,
                  },
                  {
                    showName: 'Climate adaptation and mitigation',
                    subSectionNAme: 'impact-area',
                    id: 4,
                  },
                  {
                    showName: 'Environmental health and biodiversity',
                    subSectionName: 'impact-area',
                    id: 5,
                  },
                ];
                this.mapDataInMenu(3, 1, 8, impacAreasQuemados);
              },
              (err) => {
                console.log(err);
              }
            );
        }
      });
  }

  activeClassByRoute(route: []) {
    let correct = 0;

    let baseUrl = this.router.routerState.snapshot.url;
    route.map((resp: string) => {
      correct =
        baseUrl.indexOf(resp.toLowerCase().split(' ').join('-')) > -1
          ? correct + 1
          : correct;
    });
    // if (stage) {

    return correct == route.length ? true : false;
    // }else{
    //   return baseUrl.indexOf(route)>-1?true:false
    // }
  }

  menuNavigation(
    active,
    stage: string,
    section: string,
    isSection: boolean,
    subsection?: string | []
  ) {
    let baseUrl =
      this.router.routerState.snapshot.url.substring(
        0,
        this.router.routerState.snapshot.url.indexOf('stages/')
      ) + 'stages/';
    let stageParam = stage.toLowerCase().split(' ').join('-');

    if (active) {
      if (isSection) {
        if (!subsection.length) {
          this.router.navigate([baseUrl, stageParam, section]);
        }
      } else {
        if (subsection) {
          this.router.navigate([baseUrl, stageParam, section, subsection]);
        }
      }
    } else {
      this.router.navigate([baseUrl, stageParam, 'under-construction-page']);
    }
  }

  dynamicListNavigation(
    itemID,
    stage: string,
    section: string,
    subsection?: string | []
  ) {
    let baseUrl =
      this.router.routerState.snapshot.url.substring(
        0,
        this.router.routerState.snapshot.url.indexOf('stages/')
      ) + 'stages/';
    let stageParam = stage.toLowerCase().split(' ').join('-');
    console.log([baseUrl, stageParam, section, subsection, itemID]);
    this.router.navigate([baseUrl, stageParam, section, subsection, itemID]);
  }

  toggleExpand(subSectionsList: HTMLElement) {
    subSectionsList.classList.toggle('expandIbd');
    subSectionsList.classList.toggle('collapseIbd');
    // console.log('toggleExpand');
  }

  goToWp(id) {
    let currentUrl = this.router.url;
    this.router
      .navigateByUrl(
        `/initiatives/${this.initiativesSvc.initvStgId}/stages/concept/work-package`,
        { skipLocationChange: true }
      )
      .then(() => {
        this.router.navigate([
          `/initiatives/${this.initiativesSvc.initvStgId}/stages/concept/work-package/` +
            id,
        ]);
      });
  }

  parseStageUrl(meta: any, section: string) {
    const snapshot = this.router.routerState.snapshot;
    const baseUrl =
      snapshot.url.substring(0, snapshot.url.indexOf('stages/')) + 'stages/';
    const stage = meta.description.toLowerCase().split(' ').join('-');
    return `${baseUrl}${stage}/${section.toLowerCase().split(' ').join('-')}`;
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
}
