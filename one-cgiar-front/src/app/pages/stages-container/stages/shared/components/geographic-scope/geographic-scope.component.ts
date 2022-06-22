import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { DataControlService } from '../../../../../../shared/services/data-control.service';
import { ClarisaService } from '../../../../../../shared/services/clarisa.service';


@Component({
  selector: 'app-geographic-scope',
  templateUrl: './geographic-scope.component.html',
  styleUrls: ['./geographic-scope.component.scss']
})
export class GeographicScopeComponent implements OnInit {
  @Input() regionsSelectedList;
  @Input() countriesSelectedList=[];
  @Input() localForm:FormGroup;
  @Input() subject: String;
  showForm=false;
  constructor(
    public _initiativesService:InitiativesService,
    public _dataControlService:DataControlService,
    public _clarisaService:ClarisaService
  ) { 

  }

  ngOnInit(): void {
    // console.log(this.localForm.get('is_global').value);
    // console.log(this.regionsSelectedList)
    this.setIsGlobal(this.localForm.value.is_global);
  }
  
  setIsGlobal(value){
    this.localForm.controls['is_global'].setValue(value);
    // console.log(this.localForm.value.is_global);
  }


}
