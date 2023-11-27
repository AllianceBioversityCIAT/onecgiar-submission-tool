import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DataControlService } from '../../shared/services/data-control.service';
import { ManageAccessComponent } from './stages/shared/components/manage-access/manage-access.component';
import { forkJoin, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { StagesMenuService } from '../../shared/services/stages-menu.service';
import { InteractionsService } from '../../shared/services/interactions.service';
import { InitiativesService } from '../../shared/services/initiatives.service';
import { UtilsService } from '../../shared/services/utils.service';
import { PusherService } from '../../shared/services/pusher.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-stages-menu',
  templateUrl: './stages-menu.component.html',
  styleUrls: ['./stages-menu.component.scss']
})
export class StagesMenuComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')) || null;
  toolTipText:string;

  constructor(
    public activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public datepipe: DatePipe,
    public initiativesSvc: InitiativesService,
    public stageMenu: StagesMenuService,
    public _interactionsService: InteractionsService,
    public dialog: MatDialog,
    private router: Router,
    public _dataControlService: DataControlService,
    private _utilsService:UtilsService,
    public _pusherService: PusherService,
    public _authService:AuthService
  ) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(ManageAccessComponent, {
      width: '100%',
      height: '90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this._dataControlService.generalInfoChange$.emit();
    });
  }

  sectionsList = [];

  ngOnInit(): void {
    // console.log(this._authService.lsUserRoles.name)
    this.sectionsList = this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/')).split('/');
    let testi = 1;
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.sectionsList = event.url.substring(event.url.indexOf('stages/')).split('/');
        this._dataControlService.breadcrumbItemTwo = event?.url.indexOf('work-package') !== (-1) ? this._dataControlService.breadcrumbItemTwo : '';
      }
    })
    this._interactionsService.collapseHeader = true;

    this.initiativesSvc.getStages().subscribe((resp:any)=>{
      this.activedRouteEvent(resp?.stages);
    })


    // TODO stageId 3 condition
    if (this.initiativesSvc.initiative.stageId === 3) {
      this.initiativesSvc.getInitvStgId(this.initiativesSvc.initiative.id, 3).subscribe(resp => {
        this.initiativesSvc.initvStgId = resp.response;
      })
    }

    // TODO stageId 3 condition
    this._dataControlService.validateMenu$.subscribe(resp => {
      // console.log(resp)
      // if (this.initiativesSvc.initiative.stageId === 3) {
        this.validateAllSections();
      // }
    })
    this._dataControlService.loadMenu$.emit('full-proposal');

  }

  currentStageAux = '';
  validateCurrentStageChange(stageName){
    // console.log(this.initiativesSvc.initiative.exactStageName)
    let currentRoute = this.router.url;
    if (this.currentStageAux != stageName && this.currentStageAux != '') {
          this.router.navigateByUrl(`/initiatives/${this.initiativesSvc.initiative.id}/stages/${this.initiativesSvc.initiative.exactStageName}`).then(()=>{
              setTimeout(() => {
                this.router.navigateByUrl(currentRoute)
              }, 500);
        })
    }
    this.currentStageAux = stageName;
  }

  activedRouteEvent(stagesList:[]){
   
    this.activatedRoute.params.subscribe(resp => {

      this.validateCurrentStageChange(resp?.stageName);
      
      stagesList.map((stageItem:any)=>{
        stageItem.stageNameKebabCase = this._utilsService.convertToKebabCase(stageItem?.description)
      })

      let currentStage:any = stagesList.find((stageItem:any) => stageItem?.stageNameKebabCase == resp?.stageName)
      // console.log(currentStage)
      // console.log(currentStage?.id)
      // console.log("Change initiative=> " , currentStage?.id);
      this.initiativesSvc.initiative.stageName = currentStage.stageNameKebabCase != 'pre-concept' ? 'proposal' : currentStage.stageNameKebabCase;
      this.initiativesSvc.initiative.exactStageName = currentStage.stageNameKebabCase;
      this.initiativesSvc.initiative.id = resp['id'];

      this.initiativesSvc.initiative.stageId = currentStage?.id

      const promise1 = this.initiativesSvc.getInitiativeById(resp['id']);
      const promise2 = this.initiativesSvc.getUsersByInitiative(resp['id']);

      forkJoin([promise1, promise2]).subscribe(val => {
        // console.log(val)
        const sucP1 = val[0];
        const sucP2 = val[1].response.users;
        this.initiativesSvc.initiative.name = sucP1.name;
        this.initiativesSvc.initiative.official_code = sucP1.official_code;
        this.initiativesSvc.setTWKAttributes();
        // this.initiativesSvc.initiative.stageId = sucP1.stages.find(stg => stg.initvStgId == sucP1.initvStgId).stageId;
        // this.initiativesSvc.initiative.stageName = this.initiativesSvc.initiative.stageId == 2 ? 'pre-concept' : 'proposal' ;
        

        this.initiativesSvc.initiative.users = sucP2;
        this.initiativesSvc.initiative.status = sucP1.status;
        this.initiativesSvc.setTWKAttributes();
        this.getInitiativeReadOnlyValidation(this.initiativesSvc.initiative);
        this.initiativesSvc.getSubmission(this.initiativesSvc.initiative.id, this.initiativesSvc.initiative.stageId).subscribe(
          res =>{
            const sub = res.response.submission;
            if(sub){
              this.initiativesSvc.initiative.submission = sub;
              this.toolTipText = `Submitted by: 
              ${sub.first_name} ${sub.last_name}
              On: 
              ${ this.datepipe.transform(sub.updated_at, 'yyyy-MM-dd HH:mm zz') }`
            }
          },
          error=>{
            console.log(error)
          }
        )
      }, reason => {
        console.log(reason)
      });

    });
    
  }



  // managerAccesible() {
  //   const userLeadColead = this.initiativesSvc.initiative.users.find(usr => usr.userId == this.user.id);
  //   if (this.user.roles.find(r => r.acronym === 'ADM')) return true;
  //   if (userLeadColead == null) return false;
  //   return !this.initiativesSvc.initiative.readonly;
  // }

  toggleMenu(menu: HTMLElement) {
    menu.classList.toggle('showMenu');
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }



  getInitiativeReadOnlyValidation(initiative) {

    /**
     * Validate by roles
     */
    // console.log(initiative?.status)
     this.initiativesSvc.getRolefromInitiativeById(this.initiativesSvc.initiative.id).subscribe(resp => {
      //  console.log(resp)
      // console.log(resp?.response?.roles[0]?.name)
       this.initiativesSvc.initiative.userRoleName = resp?.response?.roles[0]?.name;
       this.initiativesSvc.initiative.userRoleId = resp?.response?.roles[0]?.roleId;
      //  console.log(this.initiativesSvc.initiative.userRoleName)
      // this.initiativesSvc.setTWKAttributes();
      let validations = ()=>{
        // console.log(resp?.response?.roles[0]?.roleId)
        if (this.user?.roles[0].id === 1 && initiative?.status == 'Editing') return false
        if (resp?.response?.roles[0]?.roleId !== 4 &&  resp?.response?.roles[0]?.roleId != undefined && initiative?.status == 'Editing') return false

   
        return true;
 
      }
      this.initiativesSvc.initiative.readonly = validations();
      // console.log(this.initiativesSvc.initiative.readonly)
      // console.log(resp?.response?.roles[0]?.roleId)
   
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.initiativesSvc.initiative.userRoleName = null;
  }

  validateAllSections() {
    // console.log('stageId ',this.initiativesSvc.initiative.stageId)
    // console.log('id ',this.initiativesSvc.initiative.id)
    this.initiativesSvc.getSectionsValidation(this.initiativesSvc.initiative.id, this.initiativesSvc.initiative.stageId).subscribe(resp => {
      if (this.initiativesSvc.initiative.stageId == 4) this._dataControlService.isdcFeedbackValidation = resp?.response.isdcFeedBack;
      //  console.log(resp?.response.isdcFeedBack)
      // console.log(resp)
      if (!resp?.response) return;
      Object.keys(resp?.response).map(key => {
        let stageId = this.initiativesSvc.initiative.stageId;
        if (!resp.response[key] || resp.response[key] == null) return;
        let sectionId = resp.response[key]?.sectionId;
        let ValidateGI = resp.response[key]?.validation;
        let result = this._dataControlService?.userMenu.find(item => item.stageId == stageId)?.sections.find(item => item.sectionId == sectionId)
        result.fieldsCompleted = ValidateGI;
        let subSectionsToMap = resp.response[key].subSections;
        if (!subSectionsToMap) return;

        subSectionsToMap.map(item => {
          let menuSubsections = result.subsections.find(subSeItem => subSeItem.subSectionId == item.subSectionId);
          if (menuSubsections) menuSubsections.fieldsCompleted = item.validation;

          if (!item.hasOwnProperty('dinamicList')) return;
          item.dinamicList?.map(resp => {
            if (!(menuSubsections?.dynamicList?.find(dynamicItem => dynamicItem.id == resp.impact_area_id))) return false
            menuSubsections.dynamicList.find(dynamicItem => dynamicItem.id == resp.impact_area_id).fieldsCompleted = resp.validation;
          })

        });


      })

    })

  }


}
