import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InitiativesService } from '@shared/services/initiatives.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private dataControlService:DataControlService
  ) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(ManageAccessComponent, {
      width: '100%',
      height:'90%',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // location.reload();
      // let currentUrl = this.router.url;
      // this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
      //     this.router.navigate([currentUrl]);
      // });
      this.dataControlService.generalInfoChange$.emit();
    });
  }


  ngOnInit(): void {
    this._interactionsService.collapseHeader=true;
    this.activatedRoute.params.subscribe(resp => {
      this.initiativesSvc.initvStgId = resp['id'];
      this.stageMenu.getFormStageStatus(this.initiativesSvc.initvStgId);
    });
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO", generalInformationForm.value);
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
