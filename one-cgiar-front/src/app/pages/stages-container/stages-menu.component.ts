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

  constructor(
    public activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
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
      // console.log('The dialog was closed');
      this._dataControlService.generalInfoChange$.emit();
    });
  }

  sectionsList = [];

  ngOnInit(): void {
    this.sectionsList = this.router.routerState.snapshot.url.substring(this.router.routerState.snapshot.url.indexOf('stages/')).split('/');
    let testi = 1;
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        // console.log("NavigationStart "+testi++);
        // console.log(event);
        this.sectionsList = event.url.substring(event.url.indexOf('stages/')).split('/');
        this._dataControlService.breadcrumbItemTwo = event?.url.indexOf('work-package') !== (-1) ? this._dataControlService.breadcrumbItemTwo : '';
      }
    })
    this._interactionsService.collapseHeader = true;
    this.activatedRoute.params.subscribe(resp => {
      // this.initiativesSvc.initvStgId = resp['id'];
      this.initiativesSvc.initiative.id = resp['id'];
      this.initiativesSvc.getInitiativeById(resp['id']).subscribe((success) => {
        this.initiativesSvc.initiative.name = success.name;
          this.initiativesSvc.initiative.official_code = success.official_code;
        },
        error => {
          console.log(error);
        },
      )
      // this.initiativesSvc.getInitvStgId()
      // this.initiativesSvc.getAllInitiatives().subscribe(initiativeResp=>{
      //   this.initiativesSvc.initvStgId = initiativeResp.find(initiative=>initiative.id == resp['id']).initvStgId;
      // })
      // console.log("initiative id menu : "+this.initiativesSvc.initiative.id);
      // this.stageMenu.getFormStageStatus(this.initiativesSvc.initvStgId);
      // this.initiativesSvc.getGreenCheckStatus(this.initiativesSvc.initvStgId).subscribe(resp=>{
      //   console.log(resp);
      //   this.stageMenu.validateAllSectionsStatus('concept',resp.response?.validatedSections,this.initiativesSvc.initvStgId);
      // })
    });
  }

  onSave(generalInformationForm): void {
    // console.log("GUARDANDO", generalInformationForm.value);
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
