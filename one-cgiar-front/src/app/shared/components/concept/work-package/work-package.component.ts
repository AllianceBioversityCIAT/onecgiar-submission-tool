import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectionIndicatorsModalComponent } from '@app/shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InteractionsService } from '../../../services/interactions.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { DataControlService } from '../../../services/data-control.service';

@Component({
  selector: 'app-work-package',
  templateUrl: './work-package.component.html',
  styleUrls: ['./work-package.component.scss'],
})
export class WorkPackageComponent implements OnInit {


  
  
  

  tabs=[
    {
      name: 'General information',
      route: 'general-information',
      active: false,
    },    
    {
      name: 'Geographic scope',
      route: 'geographic-scope',
      active: false,
    },
    {
      name: 'Projection of benefits',
      route: 'geographic-scope',
      active: false,
    }
  ]; 
  activeLink = this.tabs[0].name;
  animationSize=500;
  regionsSelectedList: any = [];
  countriesSelectedList:any = [];
  
  panelOpenState = false;
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range
    .value;

  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
    public initiativesSvc: InitiativesService,
    private interactionsService:InteractionsService,
    private activatedRoute:ActivatedRoute,
    public  _dataControlService:DataControlService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp => {
      this._dataControlService.WorkPackageID = resp.id;
      console.log(resp);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectionIndicatorsModalComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  DialogConfirm(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.removeUserToInitiative();
      }
      console.log('The dialog was closed');
    });
  }









}
