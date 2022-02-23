import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-geographic-scope-fields',
  templateUrl: './geographic-scope-fields.component.html',
  styleUrls: ['./geographic-scope-fields.component.scss']
})
export class GeographicScopeFieldsComponent implements OnInit {
  @Input() regionsSelectedList=[];
  @Input() countriesSelectedList=[];
  @Input() objectItem;
  @Input() objectAtributteName;
  // @Input() localForm:FormGroup;
  showForm=false;
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService
  ) { 

  }

  ngOnInit(): void {
    // console.log(this.localForm.get('is_global').value);
    // this.setIsGlobal(this.localForm.value.is_global);
  }
  
  setIsGlobal(value){
    this.objectItem[this.objectAtributteName] = value || false;
    // this.localForm.controls['is_global'].setValue(value || false);
    // console.log(this.localForm.value.is_global);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._dataControlService.showCountries = false;
    this._dataControlService.showRegions = false;
  }

}
