import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InitiativesService } from '@shared/services/initiatives.service';
import { ActivatedRoute, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { MatDialog } from '@angular/material/dialog';
import { DataControlService } from '../../shared/services/data-control.service';
import { ManageAccessComponent } from './stages/shared/components/manage-access/manage-access.component';

@Component({
  selector: 'app-stages-menu',
  templateUrl: './stages-menu.component.html',
  styleUrls: ['./stages-menu.component.scss']
})
export class StagesMenuComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')) || null;

  constructor(
    public activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public initiativesSvc: InitiativesService,
    public stageMenu: StagesMenuService,
    public _interactionsService: InteractionsService,
    public dialog: MatDialog,
    private router: Router,
    public _dataControlService: DataControlService,
    private _initiativesService: InitiativesService
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
      this.initiativesSvc.getInitiativeById(resp['id']).subscribe((success) => {
        this.initiativesSvc.initiative.name = success.name;
        this.initiativesSvc.initiative.official_code = success.official_code;
        this.initiativesSvc.initiative.stageId = success.stages.find(stg => stg.initvStgId == success.initvStgId).stageId;
      },
        error => {
          console.log(error);
        },
      )

    });

    this._initiativesService.getInitvStgId(this._initiativesService.initiative.id, 3).subscribe(resp => {
      this._initiativesService.initvStgId = resp.response;
      this.getRolefromInitiativeById();
    })

    this._dataControlService.validateMenu$.subscribe(resp => {
      this.validateAllSections();
    })
    this._dataControlService.loadMenu$.emit('full-proposal');

  }

  onSave(generalInformationForm): void {
    // console.log("GUARDANDO", generalInformationForm.value);
  }

  toggleMenu(menu: HTMLElement) {
    menu.classList.toggle('showMenu');
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }



  getRolefromInitiativeById() {
    this._initiativesService.getRolefromInitiativeById(this._initiativesService.initiative.id).subscribe(resp => {
      // console.log(resp);
      let rol = resp.response.roles
      let firstRol = rol[0]?.roleId

      if (rol.length) {
        this._initiativesService.initiative.readonly = (firstRol === 1 || firstRol === 2 || firstRol === 3 || firstRol === 5 || this.user?.roles[0].id === 1) ? false : true;
      } else {
        this._initiativesService.initiative.readonly = (this.user?.roles[0].id === 1) ? false : true;
      }

    });
  }

  validateAllSections() {

    this._initiativesService.getSectionsValidation(this._initiativesService.initiative.id, 3).subscribe(resp => {
      // console.log("%c Green check: ",  'color: #f4f814',resp.response);

      Object.keys(resp.response).map(key => {
        let stageId = 3;
        if (!resp.response[key]) return null;
        let sectionId = resp.response[key]?.sectionId;
        let ValidateGI = resp.response[key]?.validation;
        let result = this._dataControlService?.userMenu.find(item => item.stageId == stageId).sections.find(item => item.sectionId == sectionId)
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
