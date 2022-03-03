import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionsService } from '../../services/interactions.service';
import { DataControlService } from '../../services/data-control.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ListToMap } from './classes/listToMap';
import { AuthService } from '../../services/auth.service';
import { StagesMenuService } from '../../services/stages-menu.service';
import { InitiativesService } from '../../services/initiatives.service';
import { RequestsService } from '../../services/requests.service';
import { UtilsHandler } from '../../utils/utils';
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
  impacAreasList = [];
  display: boolean = false;
  city: string;
  localMenuChangesubscribtion$;
  statuses: any[];
  statusTextObj = {};
  currentUser;

  // stageUrl;
  constructor(
    public _requests: RequestsService,
    public router: Router,
    private auth: AuthService,
    public initiativesSvc: InitiativesService,
    public stgMenuSvc: StagesMenuService,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService
  ) { }



  ngOnInit(): void {
    let loadMenu$ = this._dataControlService.loadMenu$.subscribe(
      (stageName) => {
        this.currentStageName = stageName;
        loadMenu$.unsubscribe();
      }
    );

    this.localMenuChangesubscribtion$ = this._dataControlService.menuChange$.subscribe(() => {
      // console.log("menuChange$");
      this.currentUser = this.auth.userValue;
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

  /**
   * 
   * Asssessment management
   */
  changeHide(val: boolean) {
    this.display = val;
    this.statuses.forEach(s => {
      s['clicked'] = this.initiativesSvc.initiative.status === s['status'] ? true : false;
    });
  }

  getAssessmentStatuses() {
    if (this.currentUser.roles.find(r => r.acronym == 'ADM') || this.currentUser.roles.find(r => r.acronym == 'ASSESS')) {
      this.initiativesSvc.getAssesssmentStatuses(this.initiativesSvc.initiative.id, this.initiativesSvc.initiative.stageId).subscribe(
        resp => {
          resp.response.statuses.forEach(s => {
            s['clicked'] = this.initiativesSvc.initiative.status === s['status'] ? true : false;
          });
          this.statuses = resp.response.statuses;
        },
        err => {
          console.log(err);
          this._interactionsService.errorMessage(err.error?.description, 2000);
        }
      )
    }
  }

  onStatusClick(event, clickedStatus) {
    clickedStatus.clicked = !clickedStatus.clicked
    this.statuses.forEach(st => {
      const s = st;
      if (s['id'] != clickedStatus.id) {
        s['clicked'] = false
      }
    });
  }

  validateDisabledStatusSelected() {
    const statusSelected = this.statuses.filter(st => st.clicked == true);
    return statusSelected.length > 0 ? false : true;
  }

  onConfirmAssessment() {
    const statusSelected = this.statuses.filter(st => st.clicked == true)[0];
    const updateObj = { description: this.statusTextObj['description'], statusId: statusSelected.id };
    console.log(updateObj)
    this.initiativesSvc.updateSubmissionStatus(this.initiativesSvc.initiative.id, this.initiativesSvc.initiative.stageId, updateObj).subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err);
        this._interactionsService.errorMessage(err.error?.description, 2000);
      }
    )
  }

  // * Asssessment management


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
    if (!this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)) return ;
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .previewButton = object);
    // console.log(sectionFinded);
  }

  mapDataInMenu(stageId, sectionId, subSectionId, list) {
    if (!this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)) return ;
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).dynamicList = list);
    // console.log(sectionFinded);
  }

  mapDataInMenuDynamicListSubSection(stageId, sectionId, subSectionId, list) {
    if (!this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)) return ;
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).dynamicListSubSection = list);
    // console.log(sectionFinded);
  }

  mapPreviewInDynamicListMenu(stageId, sectionId, subSectionId, object) {
    if (!this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)) return ;
    let sectionFinded = (this._dataControlService.userMenu
      .find((menuItem) => menuItem.stageId == stageId)
      .sections.find((section) => section.sectionId == sectionId)
      .subsections.find(
        (subSection) => subSection.subSectionId == subSectionId
      ).previewButton = object);
    // console.log(sectionFinded);
  }

  getMenu() {
    this.initiativesSvc.getMenu(this.initiativesSvc.initiative.id).subscribe((userMenuResp: any) => {
      // console.log("getMenu")
      this._dataControlService.userMenu = userMenuResp.response.stages;
      // console.log(this._dataControlService.userMenu)

      // this.getPreConceptSimulated();
      // console.log(userMenuResp.response.stages.length);
      //! DELETE 
      this._dataControlService?.userMenu?.find(stage => stage?.stageId == 3)?.sections?.find(section => section?.sectionId == 8)?.subsections?.splice(this._dataControlService?.userMenu?.find(stage => stage?.stageId == 3).sections.find(section => section.sectionId == 8).subsections.findIndex(subSection => subSection.subSectionId == 17), 1)
      //!
      if (userMenuResp.response.stages.length > 0) {


        // console.log(this.initiativesSvc.initiative.stageId)

        if (this.initiativesSvc.initiative.stageId === 3) {
          this.initiativesSvc.getWpsFpByInititative(this.initiativesSvc.initiative.id, 'proposal').subscribe((wpsResp) => {
            let wpss = new ListToMap(wpsResp.response.workpackage, '/work-package/', 'work-package', 'showName', 'acronym').getList();
            this.mapDataInMenu(3, 5, 12, wpss);
            this._dataControlService.wpMaped = true;
          }, (err) => {
            console.log(err);
            this._dataControlService.wpMaped = true;
          });
        }


        if (this.initiativesSvc.initiative.stageId === 2) {
          this.initiativesSvc.getWpsFpByInititative(this.initiativesSvc.initiative.id, 'pre-concept' ).subscribe((wpsResp) => {
            let wpssPc = new ListToMap(wpsResp.response.workpackage, '/work-package/', 'work-package', 'showName', 'acronym').getList();
            this.mapDataInMenu(2, 13, 28, wpssPc);
            this._dataControlService.wpMaped = true;
          }, (err) => {
            console.log(err);
            this._dataControlService.wpMaped = true;
          });
        }





        // //! Pre concept simulation
        // let wpssPc = new ListToMap(wpsResp.response.workpackage, '/work-package/', 'work-package', 'showName', 'acronym').getList();
        // this.mapDataInMenu(2, 13, 28, wpssPc);
        // // //!

        let pobList = new ListToMap(this.impacAreasList, '/impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(3, 1, 8, pobList);

        let impactStatementsList = new ListToMap(this.impacAreasList, '/impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(3, 7, 16, impactStatementsList);

        let tableAImpactArea = new ListToMap(this.impacAreasList, '/impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(3, 8, 37, tableAImpactArea);

        // //! Pre concept simulation
        let resultsList = new ListToMap(this.impacAreasList,'/impact-area/','impact-area','id','name').getList();
        this.mapDataInMenu(2, 16, 29, resultsList);
        // //! 

        this.mapReportInSubSectionMenu(3, 9, {
          showName: 'Risk assessment preview',
          frontRoute: '/mpara-reports'
        })

        this.mapReportInSubSectionMenu(3, 15, {
          showName: 'Human Resources preview',
          frontRoute: '/human-resources-reports'
        })

        this.mapPreviewInDynamicListMenu(3, 7, 16, {
          showName: 'Partners preview',
          frontRoute: '/is-reports'
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
          showName: 'Geographic scope preview',
          frontRoute: '/work-packages/wp-reports'
        });

        this.mapPreviewInDynamicListMenu(3, 1, 8, {
          showName: 'Projection of benefits preview',
          frontRoute: '/projection-of-benefits/pob-reports'
        });

        if (this.impacAreasList.length) {
          this._dataControlService.pobMaped = true;
          this._dataControlService.impactStatementsMaped = true;
        }

      
        // this.getAssessmentStatuses();
        
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
