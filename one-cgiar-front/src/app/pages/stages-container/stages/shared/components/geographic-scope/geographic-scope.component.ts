import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClarisaService } from '@app/shared/services/clarisa.service';
import { DataControlService } from '@app/shared/services/data-control.service';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { InteractionsService } from '@app/shared/services/interactions.service';

@Component({
  selector: 'app-geographic-scope',
  templateUrl: './geographic-scope.component.html',
  styleUrls: ['./geographic-scope.component.scss']
})
export class GeographicScopeComponent implements OnInit {
  @Input() regionsSelectedList=[];
  @Input() countriesSelectedList=[];
  @Input() localForm:FormGroup;
  showForm=false;
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    private _interactionsService:InteractionsService,
    public _clarisaService:ClarisaService
  ) { 

  }

  ngOnInit(): void {
    // console.log(this.localForm.get('is_global').value);
    this.setIsGlobal(this.localForm.value.is_global);
  }
  
  setIsGlobal(value){
    this.localForm.controls['is_global'].setValue(value);
    // console.log(this.localForm.value.is_global);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._dataControlService.showCountries = false;
    this._dataControlService.showRegions = false;
  }

}
