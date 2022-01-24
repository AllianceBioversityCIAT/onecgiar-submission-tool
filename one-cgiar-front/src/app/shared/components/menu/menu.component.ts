import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsHandler } from '@shared/utils/utils';
import { InitiativesService } from '@shared/services/initiatives.service';
import { RequestsService } from '@shared/services/requests.service';
import { StagesMenuService } from '@shared/services/stages-menu.service';
import { InteractionsService } from '../../services/interactions.service';
import { group } from '@angular/animations';
import { DataControlService } from '../../services/data-control.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators';
import { ListToMap } from './classes/listToMap';
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
  currentStageName = '';
  impacAreasList = []

  // stageUrl;
  constructor(
    public _requests: RequestsService,
    public router: Router,
    public initiativesSvc: InitiativesService,
    public stgMenuSvc: StagesMenuService,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService
  ) { }

  localMenuChangesubscribtion$;

  ngOnInit(): void {
    let loadMenu$ = this._dataControlService.loadMenu$.subscribe(
      (stageName) => {
        this.currentStageName = stageName;
        loadMenu$.unsubscribe();
      }
    );

    this.localMenuChangesubscribtion$ = this._dataControlService.menuChange$.subscribe(() => {
      // console.log("menuChange$");
      this.getMenu();
      // this.getAllIWorkPackages();
      // console.log('%cgetAllIWorkPackages','background: #222; color: #37ff73');
    });

    this._dataControlService.menuChange$.emit();

    this.stgMenuSvc.menu.subscribe((menu) => {
      this.subMenusFormValidation = menu;
    });

    this.getImpacAreasList();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.localMenuChangesubscribtion$.unsubscribe();
  }

  getImpacAreasList() {
    // console.log("getImpacAreasList");
    this.initiativesSvc.getImpactAreas().subscribe(impacAreas => {

      // console.log(impacAreas.response.impactAreasRequested);

      this.impacAreasList = impacAreas.response.impactAreasRequested;
      // console.log(this.impacAreasList);
    }, (err) => {
      console.log(err);

    }, () => {
      // console.log("call");
      this._dataControlService.menuChange$.emit();
      // this._dataControlService.validateMenu$.emit();
    })
  }

  mapReportInSubSectionMenu(stageId, sectionId, object) {
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .previewButton = object);
    // console.log(sectionFinded);
  }

  mapDataInMenu(stageId, sectionId, subSectionId, list) {
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).dynamicList = list);
    // console.log(sectionFinded);
  }

  mapDataInMenuDynamicListSubSection(stageId, sectionId, subSectionId, list) {
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).dynamicListSubSection = list);
    // console.log(sectionFinded);
  }

  mapPreviewInDynamicListMenu(stageId, sectionId, subSectionId, object) {
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).previewButton = object);
    // console.log(sectionFinded);
  }

  getPreConceptSimulated(){
    this._dataControlService.userMenu.push({
      stageId:1,
      description: "Pre concept",
      sections: [
        {
          "sectionId": 1,
          "stage": "Full Proposal",
          "description": "general-information",
          "display_name": "General Information",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 2,
          "stage": "Full Proposal",
          "description": "initial-theory-of-change",
          "display_name": "Initial theory of change",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 3,
          "stage": "Full Proposal",
          "description": "initiative-statements",
          "display_name": "Initiative statements",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 4,
          "stage": "Full Proposal",
          "description": "wp-and-geo-focus",
          "display_name": "Work packages and Geographic focus",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [
            {
              "subSectionId": 112,
              "description": "work-packages",
              "display_name": "Work packages",
              "single_section": 1,
              "sectionId": 5,
              "active": 1,
              "visible": 1,
              "order": 0,
              "block": null,
            }
          ],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 5,
          "stage": "Full Proposal",
          "description": "results",
          "display_name": "Results",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [
            {
              "subSectionId": 113,
              "description": "impact-areas",
              "display_name": "Impact areas",
              "single_section": 0,
              "sectionId": 5,
              "active": 1,
              "visible": 1,
              "order": 0,
              "block": null,
            },
            {
              "subSectionId": 115,
              "description": "sdg-mapping",
              "display_name": "SDG Mapping",
              "single_section": 1,
              "sectionId": 5,
              "active": 1,
              "visible": 1,
              "order": 0,
              "block": null,
            }
          ],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 6,
          "stage": "Full Proposal",
          "description": "innovations",
          "display_name": "Innovations",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 7,
          "stage": "Full Proposal",
          "description": "key-partners",
          "display_name": "Key partners",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [
            {
              "subSectionId": 116,
              "description": "top-5-key-demand-partner-organizations",
              "display_name": "Top 5 Key Demand Partner Organizations",
              "single_section": 1,
              "sectionId": 7,
              "active": 1,
              "visible": 1,
              "order": 0,
              "block": null,
            },
            {
              "subSectionId": 117,
              "description": "top-5-key-innovation-partner-organizations",
              "display_name": "Top 5 Key Innovation Partner Organizations",
              "single_section": 1,
              "sectionId": 7,
              "active": 1,
              "visible": 1,
              "order": 0,
              "block": null,
            },
            {
              "subSectionId": 118,
              "description": "top-5-key-scaling-partner-organizations",
              "display_name": "Top 5 Key Scaling Partner Organizations",
              "single_section": 1,
              "sectionId": 7,
              "active": 1,
              "visible": 1,
              "order": 0,
              "block": null,
            },
          ],
          "fieldsCompleted": 0
        },
        {
          "sectionId": 8,
          "stage": "Full Proposal",
          "description": "global-budget",
          "display_name": "Global Budget",
          "active": 1,
          "visible": 1,
          "orderSection": 1,
          "stageId": 3,
          "subsections": [],
          "fieldsCompleted": 0
        }
      ]
    })

  }

  getMenu() {
    this.initiativesSvc.getMenu(this.initiativesSvc.initiative.id).subscribe((userMenuResp: any) => {
      // console.log("getMenu")
      this._dataControlService.userMenu = userMenuResp.response.stages;
      // console.log(this._dataControlService.userMenu)

      this.getPreConceptSimulated();
      // console.log(userMenuResp.response.stages.length);
      //! DELETE 
      this._dataControlService?.userMenu?.find(stage=>stage?.stageId == 3)?.sections?.find(section=>section?.sectionId == 8)?.subsections?.splice(this._dataControlService?.userMenu?.find(stage=>stage?.stageId == 3).sections.find(section=>section.sectionId == 8).subsections.findIndex(subSection=> subSection.subSectionId == 17),1)
      //!
      if (userMenuResp.response.stages.length > 1) {

        this.initiativesSvc.getWpsFpByInititative(this.initiativesSvc.initiative.id).subscribe((wpsResp) => {
          let wpss = new ListToMap( wpsResp.response.workpackage,'/work-package/','work-package','showName','acronym').getList();
          this.mapDataInMenu(3, 5, 12, wpss);
          //! Pre concept simulation
          let wpssPc = new ListToMap( wpsResp.response.workpackage,'/work-package/','work-package','showName','acronym').getList();
          this.mapDataInMenu(1, 4, 112, wpssPc);
          //! 
          this._dataControlService.wpMaped = true;
        }, (err) => {
          console.log(err);
          this._dataControlService.wpMaped = true;
        });

        let pobList =  new ListToMap(this.impacAreasList,'/impact-area/','impact-area','id','name').getList();
        this.mapDataInMenu(3, 1, 8, pobList);

        let impactStatementsList = new ListToMap(this.impacAreasList,'/impact-area/','impact-area','id','name').getList();
        this.mapDataInMenu(3, 7, 16, impactStatementsList);

        //! Pre concept simulation
        let resultsList = new ListToMap(this.impacAreasList,'/impact-area/','impact-area','id','name').getList();
        this.mapDataInMenu(1, 5, 113, resultsList);
        //! 

        this.mapReportInSubSectionMenu(3,9,{
          showName: 'Risk assessment preview',
          frontRoute: '/mpara-reports'
        })
 
        this.mapReportInSubSectionMenu(3,15,{
          showName: 'Human Resources preview',
          frontRoute: '/human-resources-reports'
        })

        this.mapPreviewInDynamicListMenu(3, 7, 16, {
          showName: 'Partners preview',
          frontRoute: '/is-resports'
        });

        this.mapDataInMenuDynamicListSubSection(3, 4, 27, 
          [{
            showName: '10.1.1 Activity breakdown',
            frontRoute: '/budget/activity-breakdown/',
          },
          {
            showName: '10.1.2 Geography breakdown',
            frontRoute: '/budget/geography-breakdown/',
          }]
        );

        this.mapPreviewInDynamicListMenu(3, 5, 12, {
          showName : 'Geographic scope preview',
          frontRoute : '/work-packages/wp-reports'
        });

        this.mapPreviewInDynamicListMenu(3, 1, 8, {
          showName: 'Projection of benefits preview',
          frontRoute: '/projection-of-benefits/pob-resports'
        });

        if (this.impacAreasList.length) {
          this._dataControlService.pobMaped = true;
          this._dataControlService.impactStatementsMaped = true;
        }

        this._dataControlService.validateMenu$.emit();
      }
      console.log("%c menu: ",  'color: #00ccff',this._dataControlService.userMenu);
    });
  }



  menuNavigation(active, stage: string, section: string, isSection: boolean, subsection?: string | []) {
    let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
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
