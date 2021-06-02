import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InitiativesService } from '@shared/services/initiatives.service';
import { ActivatedRoute, NavigationStart, Router,Event as NavigationEvent } from '@angular/router';
import { StagesMenuService } from '@app/shared/services/stages-menu.service';
import { InteractionsService } from '@app/shared/services/interactions.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageAccessComponent } from '../../shared/components/manage-access/manage-access.component';
import { DataControlService } from '../../shared/services/data-control.service';

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
    private router:Router,
    public _dataControlService:DataControlService
  ) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(ManageAccessComponent, {
      width: '100%',
      height:'90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this._dataControlService.generalInfoChange$.emit();
    });
  }


  ngOnInit(): void {
    let testi = 1;
    this.router.events.subscribe((event: NavigationEvent)=>{
      if(event instanceof NavigationStart) {
        // console.log("NavigationStart "+testi++);
        this._dataControlService.breadcrumbItemTwo= event?.url.indexOf('work-package') !== (-1) ? this._dataControlService.breadcrumbItemTwo : '';
      }
    })
    this._interactionsService.collapseHeader=true;
    this.activatedRoute.params.subscribe(resp => {
      this.initiativesSvc.initvStgId = resp['id'];
      this.stageMenu.getFormStageStatus(this.initiativesSvc.initvStgId);
    });
  }

  onSave(generalInformationForm): void {
    // console.log("GUARDANDO", generalInformationForm.value);
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
