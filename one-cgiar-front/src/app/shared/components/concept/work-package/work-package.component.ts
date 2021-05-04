import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
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
  showOutlet=false;
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
  activeLink = null;
  animationSize=500;
  regionsSelectedList: any = [];
  countriesSelectedList:any = [];
  
  panelOpenState = false;
  projectionRanges = this._requests.projectionBenefitsRangeCs.controls.range
    .value;

  constructor(
    public _requests: RequestsService,
    public dialog: MatDialog,
    public _initiativesService: InitiativesService,
    private interactionsService:InteractionsService,
    private activatedRoute:ActivatedRoute,
    public  _dataControlService:DataControlService,
    
  ) {
  }

  ngOnInit(): void {
    console.log("WP init");
    this.getCLARISARegions();
    this.getCLARISACountries();
    this.activatedRoute.params.subscribe((resp:any) => {
      let UrlSegments = this.activatedRoute.parent.snapshot['_urlSegment'].segments;
      this.activeLink = UrlSegments[UrlSegments.length-1].path;
      this._dataControlService.WorkPackageID = resp.id;
      // console.log(resp);
      // console.log("emito carga de general");
      this.showOutlet = true;
    });
  }

  OnDestroy(){
    console.log("OnDestroy WP");
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


  getCLARISARegions(){
    this._initiativesService.getCLARISARegions().subscribe(resp=>{
      console.log('%cCLARISA regions','background: #222; color: #ffff00');
      // console.log(resp);
      this._dataControlService.regionsList = resp.response.regions;
    })
  }

  getCLARISACountries(){
    this._initiativesService.getCLARISACountries().subscribe(resp=>{
      console.log('%cCLARISA countriesList','background: #222; color: #ffff00');
      // console.log(resp);
      this._dataControlService.countriesList = resp.response.countries;
      this._dataControlService.countriesAndRegionsloaded$.emit();
    },
    err=>{
      this._dataControlService.countriesAndRegionsloaded$.emit();
    })
  }






}
