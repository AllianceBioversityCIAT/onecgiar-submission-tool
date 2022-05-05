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
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../services/utils.service';
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
    private spinnerService: NgxSpinnerService,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService,
    public _utilsService: UtilsService
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
      // console.log("Get menu")
    });



    this.stgMenuSvc.menu.subscribe((menu) => {
      this.subMenusFormValidation = menu;
    });

    this.getImpacAreasList().then(() => {
      this._dataControlService.menuChange$.emit();
    }).catch(err => {
      console.log(err)
      this._dataControlService.menuChange$.emit();
    });


  }

  /**
   * 
   * Asssessment management
   */
  changeHide(val: boolean) {
    this.display = val;
    if (this.statuses.length > 0) {
      this.statuses.forEach(s => {
        // console.log(this.initiativesSvc.initiative, s)
        s['clicked'] = this.initiativesSvc.initiative.status === s['status'] ? true : false;
        if (this.initiativesSvc.initiative.status == null && s['status'] == 'Editing') {
          s['clicked'] = true;
        }
      });
    }
  }

  getAssessmentStatuses() {
    //|| this.currentUser.roles.find(r => r.acronym == 'ASSESS')
    if (this.currentUser.roles.find(r => r.acronym == 'ADM')) {
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
    // console.log('onConfirmAssessment', this.localMenuChangesubscribtion$)
    // this.spinnerService.show("submission_spinner");
    this.initiativesSvc.updateSubmissionStatus(this.initiativesSvc.initiative.id, this.initiativesSvc.initiative.stageId, updateObj)
    .subscribe(
      resp => {
        // this.spinnerService.hide("submission_spinner");
        console.log(resp)
      },
      err => {
        // this.spinnerService.hide("submission_spinner");
        console.log(err);
        this._interactionsService.errorMessage(err.error?.description, 2000);
      }
    )
  }

  // * Asssessment management


  ngOnDestroy(): void {
    this.localMenuChangesubscribtion$.unsubscribe();
  }

  async getImpacAreasList() {
    return await new Promise((resolve, reject) => {
      this.initiativesSvc.getImpactAreas().subscribe(impacAreas => {
        this.impacAreasList = impacAreas.response.impactAreasRequested;
        this._dataControlService.impacAreas = this.impacAreasList;
        resolve(null)
        // console.log("getImpacAreasList")
      }, (err) => {
        console.log(err);
        reject();
      })
    })

  }

  mapDataInMenu(list, attributeName:"subsections"|"dynamicList", stageId:number, sectionId?:number, subSectionId?:number ) {
    if (!this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId)) return;
    let elementFinded;
    elementFinded = this._dataControlService.userMenu.find((menuItem) => menuItem.stageId == stageId);

    if (stageId && sectionId)
    elementFinded = elementFinded.sections.find((section) => section.sectionId == sectionId);
    if (stageId && sectionId && subSectionId)
    elementFinded =  elementFinded.subsections.find((subSection) => subSection.subSectionId == subSectionId);

    if (elementFinded[attributeName]?.length) {
      list.map(item=>{
        elementFinded[attributeName].push(item);
      })
    }else{
      elementFinded[attributeName] = list;
    }
 
  }

  mapWorkPackagesInStage({stageId, sectionId, subSectionId }) {
    if (this.initiativesSvc.initiative.stageId === stageId) {
      this.initiativesSvc.getWpsFpByInititative().subscribe((wpsResp) => {
       
        let wpss = new ListToMap(wpsResp.response.workpackage, 'work-package/', 'work-package', 'showName', 'acronym').getList();
        // console.log(wpss)
        this.mapDataInMenu(wpss,"dynamicList",stageId, sectionId, subSectionId);
        this._dataControlService.wpMaped = true;
      }, (err) => {
        console.log(err);
        this._dataControlService.wpMaped = true;
      });
    }
  }

  getMenu() {
    // console.log(this.initiativesSvc.initiative.id);
    // console.log("getMenu")
    this.initiativesSvc.getMenu(this.initiativesSvc.initiative.id).pipe(map(resp => resp.response.stages)).subscribe((userMenuResp: any) => {

      this._dataControlService.userMenu = userMenuResp;
      //! DELETE 
      this._dataControlService?.userMenu?.find(stage => stage?.stageId == 3)?.sections?.find(section => section?.sectionId == 8)?.subsections?.splice(this._dataControlService?.userMenu?.find(stage => stage?.stageId == 3).sections.find(section => section.sectionId == 8).subsections.findIndex(subSection => subSection.subSectionId == 17), 1)
      //!
      if (userMenuResp.length) {

        const preConceptData = {
          stageId: 2,
          stageName: 'pre-concept',
          sectionId: 13,
          subSectionId: 28
        }

        this.mapWorkPackagesInStage(preConceptData);


        const fullProposalData = {
          stageId: 3,
          stageName: 'proposal',
          sectionId: 5,
          subSectionId: 12
        }

        this.mapWorkPackagesInStage(fullProposalData);

        let pobList = new ListToMap(this.impacAreasList, 'impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(pobList,'dynamicList', 3, 1, 8 );

        let impactStatementsList = new ListToMap(this.impacAreasList, 'impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(impactStatementsList,'dynamicList', 3, 7, 16 );

        let tableAImpactArea = new ListToMap(this.impacAreasList, 'impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(tableAImpactArea,'dynamicList', 3, 8, 37 );

        let resultsImpactAreas = new ListToMap(this.impacAreasList, 'impact-area/', 'impact-area', 'id', 'name').getList();
        this.mapDataInMenu(resultsImpactAreas,'dynamicList', 2, 16, 29 );

        this.mapDataInMenu( [{
          display_name: 'Risk assessment preview',
          description: '/mpara-reports'
        }],"subsections",3, 9)

        this.mapDataInMenu([{
          display_name: 'Human Resources preview',
          description: '/human-resources-reports'
        }],"subsections",3, 15)

        this.mapDataInMenu( [{
          name: 'Partners preview',
          frontRoute: '/is-reports'
        }],"dynamicList",3, 7, 16);

        this.mapDataInMenu(          [{
          name: '10.1.1 Activity breakdown',
          frontRoute: '/activity-breakdown/',
        },
        {
          name: '10.1.2 Geography breakdown',
          frontRoute: '/geography-breakdown/',
        }],"dynamicList",3, 4, 27,

        );

        // this.mapDataInMenu(3, 5, 12, {
        //   showName: 'Geographic scope preview',
        //   frontRoute: '/work-packages/wp-reports'
        // });

        // this.mapDataInMenu(3, 1, 8, {
        //   showName: 'Projection of benefits preview',
        //   frontRoute: '/projection-of-benefits/pob-reports'
        // });

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
    this.router.navigate([this.parseStageUrl(meta, section)]);
  }

  validateSubMenuForm(stageName: any, subMenu: string) {
    stageName = stageName.toLowerCase().split(' ').join('_');
    subMenu = subMenu.toLowerCase().split(' ').join('_');
    return this.subMenusFormValidation[stageName][subMenu];
  }
}
