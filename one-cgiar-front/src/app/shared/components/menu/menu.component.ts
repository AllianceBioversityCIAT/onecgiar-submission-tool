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
  stages: any[];
  stages_meta: [];
  utilsHandler = new UtilsHandler();
  subMenusFormValidation: {};
  workPackagesList: any = [];
  currentStageName='';
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
   let loadMenu$ = this._dataControlService.loadMenu$.subscribe(stageName=>{
      // console.log('%cstageName: '+stageName,'background: #222; color: #84c3fd');
      // console.log("load menu with iniid: "+this.initiativesSvc.initvStgId);
      // stageName == 'concept' ? this.getStages() : this.simulateFullProposal();
      this.currentStageName = stageName;
      this.getStages();
      loadMenu$.unsubscribe();
    })

    this._dataControlService.menuChange$.subscribe(() => {
      this.getAllIWorkPackages();
      // console.log('%cgetAllIWorkPackages','background: #222; color: #37ff73');
    })

    this._dataControlService.menuChange$.emit();
    this.stgMenuSvc.menu.subscribe(
      menu => {
        this.subMenusFormValidation = menu;
      }
    )
  }

  simulateFullProposal(){
    // console.log('%cto push','background: #222; color: #84c3fd');
    let body=[
      {
        title:'General Information ',
        route:'general-information'
      },
      {
        title: "Context",
        route:'context',
        subSections:[
          {
            title:'Challenge statement',
            route:'context/challenge-statement'
          },
          {
            title:'Comparative Advantage',
            route:'context/comparative-advantage'
          },
          {
            title:'Measurable objectives',
            route:'context/measurable-objectives'
          },
          {
            title:'Learning from prior evaluation and IA',
            route:'context/learning-fpe-and-ia'
          },
          {
            title:'Priority setting',
            route:'context/priority-setting'
          },
          {
            title:'Risk assessment',
            route:'context/risk-assessment'
          },
          {
            title:'Participatory design process',
            route:'context/participatory-design-process'
          },
        ]
      },
      {
        title: "Management Plans and policy compliance",
        subSections:[
          {
            title:'Management plan',
            route:'under-construction-page'
          },
          {
            title:'Ethics',
            route:'under-construction-page'
          },
          {
            title:'Open and FAIR data assets',
            route:'under-construction-page'
          }
        ]
      },
      {
        title: "Work Packages",
        subSections:[
          {
            title:'General information',
            route:'under-construction-page'
          },
        ]
      },
      {
        title: "Innovation packages and Projection of Benefits",
        subSections:[
          {
            title:'Innovation Packages and Scaling Readiness Strategy',
            route:'under-construction-page'
          },
          {
            title:'Projection of benefits',
            route:'under-construction-page'
          },
        ]
      },
      {
        title: "Theories of Change",
        subSections:[
          {
            title:'Full Initiative TOC',
            route:'under-construction-page'
          },
          {
            title:'Work Package TOCs',
            route:'under-construction-page'
          },
          {
            title:'Impact strategies',
            route:'under-construction-page'
          },
        ]
      },
      {
        title: "MELIA",
        subSections:[]
      },
      {
        title: "People and Culture",
        subSections:[
          {
            title:'Initiative Team',
            route:'under-construction-page'
          },
          {
            title:'Gender, Diversity and Inclusion',
            route:'under-construction-page'
          },
          {
            title:'Capacity development',
            route:'under-construction-page'
          },
        ]
      },
      {
        title: "Financial Resources",
        subSections:[
          {
            title:'Budget',
            route:'under-construction-page'
          },
        ]
      },

    ]
    this.stages[2].grouped=body;
    // console.log(this.stages[2]);
    if (this.currentStageName != 'concept') {
      this.stages[1].active = false;
      this.stages[2].active = true;
    }
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
          this.simulateFullProposal();
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
    // console.log('%c'+section,'background: #222; color: #84c3fd');
    switch (section) {
      case 'General Information ':
        return true
      case "Context":
        return true
      case 'Challenge statement':
        return true
      case 'Comparative Advantage':
        return true
      case "Governance, Strategies and Plans":
        return true
      case "Work Packages ":
        return true
      case "Innovation Module":
        return true
      case "Theory of change":
        return true
      case "MELIAs":
        return true
      case "Human and Financial Resources":
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
