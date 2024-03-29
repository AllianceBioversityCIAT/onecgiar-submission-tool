import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../../../services/auth.service';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-menu-dynamic-list',
  templateUrl: './menu-dynamic-list.component.html',
  styleUrls: ['./menu-dynamic-list.component.scss']
})
export class MenuDynamicListComponent implements OnInit {
  // @Input() subSection;
  // @Input() section;
  // @Input() stage;
  @Input() customRouterLink:string = '';
  @Input() fieldsCompleted:boolean = false;
  @Input() showTocIcon:boolean = false;
  @Input() hideCheck:boolean = false;
  @Input() type: "sub-section"|"reports" = "sub-section";

  constructor(
    public _menuService : MenuService,
    public _utilsService:UtilsService,
    public _authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  // addWorkPackage(stage){
    
  //   console.log('addWorkPackage() in stage '+stage?.stageId)

  //   let body = {active:true,id:null}
  //   this._initiativesService.saveWpFp(body,this._initiativesService.initiative.id).subscribe(resp=>{
  //     console.log(resp.response.workpackage.id)

  //     if (stage?.stageId== 3) {
  //       this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/work-package-research-plans-and-tocs/work-packages/work-package/${resp.response.workpackage.id}/wp-general-info`])
  //     }else if(stage?.stageId== 2){
  //       this.router.navigate([`/initiatives/${this._initiativesService.initiative.id}/stages/pre-concept/wp-and-geo-focus/work-packages/work-package/${resp.response.workpackage.id}`])
  //     }
  

  //     this._interactionsService.successMessage('Work package has been created')
  //   })

  // }

  // partnersNotRelatedRoute() {
  //   return `/initiatives/${this._initiativesService.initiative.id}/stages/full-proposal/impact-statements/impact-areas/partners-no-impact-area`
  // }

  // dynamicListNavigation(itemID, stage: string, section: string, subsection?: string | []) {
  //   let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
  //   let stageParam = stage.toLowerCase().split(' ').join('-');
  //   itemID =  itemID == undefined ? "" : itemID;
  //   this.router.navigate([baseUrl + stageParam + '/' + section + subsection + itemID]);
  //   // this.router.navigate([baseUrl, stageParam, section, subsection, itemID]);
  // }

  // dynamicListSubSectionNavigation(stage: string, section: string, subsection?: string | []) {
  //   let baseUrl = this.router.routerState.snapshot.url.substring(0, this.router.routerState.snapshot.url.indexOf('stages/')) + 'stages/';
  //   let stageParam = stage.toLowerCase().split(' ').join('-');
  //   // console.log(baseUrl+ stageParam+'/'+ section + subsection + itemID);
  //   return baseUrl + stageParam + '/' + section + subsection;
  //   // this.router.navigate([baseUrl, stageParam, section, subsection, itemID]);
  // }

  // validateIfShowAddWp(){
  //   return (this.subSection.subSectionId === 12 || this.subSection.subSectionId === 28) && !this._initiativesService.initiative.readonly;
  // }

}
