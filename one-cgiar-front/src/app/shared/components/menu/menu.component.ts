import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsHandler } from '@shared/utils/utils';
import { InitiativesService } from '@shared/services/initiatives.service';
import { RequestsService } from '@shared/services/requests.service';
import { StagesMenuService } from '@shared/services/stages-menu.service';
import { InteractionsService } from '../../services/interactions.service';
import { group } from '@angular/animations';
import { DataControlService } from '../../services/data-control.service';
import { trigger, state, style, animate, transition, AUTO_STYLE } from '@angular/animations'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations:[
    trigger('expandable',[
      state('expand',style({ height: '*' })),
      state('collapse',style({ height: '0' })),
      transition('collapse => expand',animate('.3s ease-in')),
      transition('expand => collapse',animate('.3s ease-out')),
    ])
  ]
})
export class MenuComponent implements OnInit {
  state='inactive';
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
      this.currentStageName = stageName;
      this.getStages();
      loadMenu$.unsubscribe();
    })

    this._dataControlService.menuChange$.subscribe(() => {
      // this.getAllIWorkPackages();
      // console.log('%cgetAllIWorkPackages','background: #222; color: #37ff73');
    })

    this._dataControlService.menuChange$.emit();
    this.stgMenuSvc.menu.subscribe(
      menu => {
        this.subMenusFormValidation = menu;
      }
    )
  }

  toggleExpand(subSectionsList:HTMLElement,texto){
    console.log('texto');
    console.log(texto);
    console.log('______________');
    // console.log(subSectionsList.classList);
    subSectionsList.classList.toggle('expandIbd');
    subSectionsList.classList.toggle('collapseIbd');
    
    // console.log("collapse ?");
    // console.log(subSectionsList.classList.contains('collapse'));
    // this.state = this.state == 'inactive'?'active':'inactive';
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
            title:'Measurable three-year outcomes',
            route:'context/measurable-objectives'
          },
          {
            title:'Learning from prior evaluations and Impact Assessments (IA)',
            route:'context/learning-fpe-and-ia'
          },
          {
            title:'Priority setting',
            route:'context/priority-setting'
          },
          {
            title:'Comparative Advantage',
            route:'context/comparative-advantage'
          },
          // {
          //   title:'Risk assessment',
          //   route:'context/risk-assessment'
          // },
          {
            title:'Participatory design process',
            route:'context/participatory-design-process'
          },
          {
            title:'Projection of benefits',
            route:'context/projection-of-benefits'
          },
        ]
      },
      {
        title: "Management Plans and policy compliance",
        subSections:[
          {
            title:'Management plan',
            route:'management-plans-and-policy-compliance/management-plan'
          },
          {
            title:'Ethics',
            route:'management-plans-and-policy-compliance/ethics'
          },
          {
            title:'Open and FAIR data assets',
            route:'management-plans-and-policy-compliance/open-and-fair-data-assets'
          }
        ]
      },
      {
        title: "Work Packages",
        subSections:[
          {
            title:'General information.',
            route:'work-packages/general-information'
          },
        ]
      },
      {
        title: "Innovation packages and Projection of Benefits",
        subSections:[
          {
            title:'Innovation Packages and Scaling Readiness Strategy',
            route:'innovation-packages-and-projection-of-benefits/innovation-packages-and-scaling-readiness-strategy'
          }
        ]
      },
      {
        title: "Theories of Change",
        subSections:[
          {
            title:'Full Initiative TOC',
            route:'theories-of-change/full-initiative-TOC'
          },
          {
            title:'Work Package TOCs',
            route:'theories-of-change/work-package-TOC'
          },
          {
            title:'Impact strategies',
            route:'theories-of-change/impact-strategies'
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
            route:'people-and-culture/initiative-Team'
          },
          {
            title:'Gender, Diversity and Inclusion',
            route:'people-and-culture/gender-diversity-inclusion'
          },
          {
            title:'Capacity development',
            route:'people-and-culture/capacity-development'
          },
        ]
      },
      {
        title: "Financial Resources",
        subSections:[
          {
            title:'Budget',
            route:'financial-resources/budget'
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
      case "Open and FAIR data assets":
        return true
      case "Projection of benefits":
        return true
      case "Management Plans and policy compliance":
        return true
      case "Management plan":
        return true
      case "Work Packages":
        return true
      case "Innovation Packages and Scaling Readiness Strategy":
        return true
      case "Full Initiative TOC":
        return true
      case "General information.":
          return true
      case "Impact strategies":
          return true
      case "Work Package TOCs":
        return true
      case "impact strategies":
        return true
      case "Initiative Team":
        return true
      case "Gender, Diversity and Inclusion":
        return true
      case "Capacity development":
        return true
      case "Budget":
        return true
      case 'Ethics':
        return true
      case "Innovation packages and Projection of Benefits":
        return true
      case "Theories of Change":
        return true
      case "MELIA":
        return true
      case "People and Culture":
        return true
      case "Financial Resources":
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
