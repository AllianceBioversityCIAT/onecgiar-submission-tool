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
    public _dataControlService: DataControlService
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
    this.sectionsList = this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/')).split('/');
    let testi = 1;
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {

        this.sectionsList = event.url.substring(event.url.indexOf('stages/')).split('/');
        this._dataControlService.breadcrumbItemTwo = event?.url.indexOf('work-package') !== (-1) ? this._dataControlService.breadcrumbItemTwo : '';
      }
    })
    this._interactionsService.collapseHeader = true;
    this.activatedRoute.params.subscribe(resp => {
      this.initiativesSvc.initiative.id = resp['id'];

      const promise1 = this.initiativesSvc.getInitiativeById(resp['id']);
      const promise2 = this.initiativesSvc.getUsersByInitiative(resp['id']);

      forkJoin([promise1, promise2]).subscribe(val => {
        // console.log(val)
        const sucP1 = val[0];
        const sucP2 = val[1].response.users;
        this.initiativesSvc.initiative.name = sucP1.name;
        this.initiativesSvc.initiative.official_code = sucP1.official_code;
        this.initiativesSvc.initiative.stageId = sucP1.stages.find(stg => stg.initvStgId == sucP1.initvStgId).stageId;
        this.initiativesSvc.initiative.stageNameToServices = this.initiativesSvc.initiative.stageId == 2 ? 'pre-concept' : 'proposal' ;
        // console.log(this.initiativesSvc.initiative.stageId);
        // console.log(this.initiativesSvc.initiative.stageNameToServices);
        this.initiativesSvc.initiative.users = sucP2;
        this.initiativesSvc.initiative.status = sucP1.status;
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

  managerAccesible() {
    const userLeadColead = this.initiativesSvc.initiative.users.find(usr => usr.userId == this.user.id);
    if (this.user.roles.find(r => r.acronym === 'ADM')) return true;
    if (userLeadColead == null) return false;
    return !this.initiativesSvc.initiative.readonly;
  }

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
    if (this.user?.roles[0].id === 1) {
      this.initiativesSvc.initiative.readonly = false;
      return
    }
    if (this.user?.roles[0].id === 4) {
      this.initiativesSvc.initiative.readonly = true;
      return
    }

    /**
     * Validate by initative status
     */
    switch (this.initiativesSvc.initiative.status) {
      case 'On hold':
        this.initiativesSvc.initiative.readonly = false;
        break;
      case 'Pending':
        this.initiativesSvc.initiative.readonly = true;
        break;
      case 'Steped up':
        this.initiativesSvc.initiative.readonly = true;
        break;
      case 'Approved':
        this.initiativesSvc.initiative.readonly = true;
        break;
      default:
        this.initiativesSvc.initiative.readonly = false;
        break;
    }



    // this._initiativesService.getRolefromInitiativeById(this._initiativesService.initiative.id).subscribe(resp => {
    //   let rol = resp.response.roles
    //   let firstRol = rol[0]?.roleId
    //   // console.log(this.initiativesSvc.initiative)
    //   if(this.initiativesSvc.initiative.status != null && this.initiativesSvc.initiative.status != 'On hold'){
    //     this._initiativesService.initiative.readonly = true;
    //   }else{
    //     if (rol.length) {
    //       this._initiativesService.initiative.readonly = (firstRol === 1 || firstRol === 2 || firstRol === 3 || firstRol === 5 || this.user?.roles[0].id === 1) ? false : true;
    //     } else {
    //       this._initiativesService.initiative.readonly = (this.user?.roles[0].id === 1) ? false : true;
    //     }
    //   }

    // });
  }

  validateAllSections() {
    // console.log(this.initiativesSvc.initiative)
    this.initiativesSvc.getSectionsValidation(this.initiativesSvc.initiative.id, this.initiativesSvc.initiative.stageId).subscribe(resp => {
      Object.keys(resp.response).map(key => {
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
