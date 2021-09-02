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
  animations:[trigger('expandable',[
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
  userMenu=[];
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
      loadMenu$.unsubscribe();
    })

    this.getMenu();

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

  mapDataInMenu(stageId,sectionId,subSectionId,list){
    let sectionFinded = this.userMenu.find(menuItem=>menuItem.stageId == stageId)
                        .sections.find(section=>section.sectionId == sectionId)
                        .subsections.find(subSection=>subSection.subSectionId == subSectionId)
                        .dynamicList =list;
    // console.log(sectionFinded);
  }

  getMenu(){
    this.initiativesSvc.getMenu(this.initiativesSvc.initiative.id).subscribe((userMenuResp:any)=>{
      this.userMenu = userMenuResp.response.stages;
      console.log(this.userMenu);
      console.log(userMenuResp.response.stages.length);
      if (userMenuResp.response.stages.length > 1) {
        this.initiativesSvc.getWpsFpByInititative(this.initiativesSvc.initiative.id).subscribe(wpsResp=>{
          wpsResp.response.workpackage.map(wpResp=>wpResp.subSectionName = 'work-package');
          this.mapDataInMenu(3,5,12, wpsResp.response.workpackage);
  
          let impacAreasQuemados = [
            {
              name:'Nutrition, health and food security',
              subSectionName:'impact-area',
              id:1
            },          {
              name:'Poverty reduction, livelihoods and jobs',
              subSectionName:'impact-area',
              id:2
            },          {
              name:'Gender equality, youth and social inclusion',
              subSectionName:'impact-area',
              id:3
            },          {
              name:'Climate adaptation and mitigation',
              subSectionNAme:'impact-area',
              id:4
            },          {
              name:'Environmental health and biodiversity',
              subSectionName:'impact-area',
              id:5
            }
          ]
          this.mapDataInMenu(3,1,8, impacAreasQuemados);
        },err=>{
          console.log(err);
        })
      }
    })
   
  }

  activeClassByRoute(route:[]){
    let correct=0;
    
    let baseUrl =  this.router.routerState.snapshot.url;
    route.map((resp:string)=>{
      correct=baseUrl.indexOf(resp.toLowerCase().split(' ').join('-'))>-1?correct+1:correct
    });
    // if (stage) {
     
     return correct == route.length ? true : false
    // }else{
    //   return baseUrl.indexOf(route)>-1?true:false
    // }
  }

  menuNavigation(active,stage:string,section:string,isSection:boolean,subsection?:string|[]){
    let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
    let stageParam = stage.toLowerCase().split(' ').join('-');   
   
    if (active){
      if (isSection) {
        if (!subsection.length){
          this.router.navigate([baseUrl,stageParam,section])  
        }
        
      }else{
        if (subsection) {
          this.router.navigate([baseUrl,stageParam,section,subsection]) 
        }
        
      }

    }else{
      this.router.navigate([baseUrl,stageParam,'under-construction-page']) 
    }
  }

  dynamicListNavigation(itemID,stage:string,section:string,subsection?:string|[]){
    let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
    let stageParam = stage.toLowerCase().split(' ').join('-');   
    console.log([baseUrl,stageParam,section,subsection,itemID]);
    this.router.navigate([baseUrl,stageParam,section,subsection,itemID]) 
  }

  toggleExpand(subSectionsList:HTMLElement){
    subSectionsList.classList.toggle('expandIbd');
    subSectionsList.classList.toggle('collapseIbd');
    // console.log('toggleExpand');
  }

  goToWp(id) {
    let currentUrl = this.router.url;
    this.router.navigateByUrl(`/initiatives/${this.initiativesSvc.initvStgId}/stages/concept/work-package`, { skipLocationChange: true }).then(() => {
      this.router.navigate([`/initiatives/${this.initiativesSvc.initvStgId}/stages/concept/work-package/` + id]);
    });
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
