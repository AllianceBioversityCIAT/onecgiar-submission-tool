import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataControlService } from '../../../../../../../../shared/services/data-control.service';

@Component({
  selector: 'app-pc-work-package',
  templateUrl: './pc-work-package.component.html',
  styleUrls: ['./pc-work-package.component.scss']
})
export class PcWorkPackageComponent implements OnInit {
  workPackageForm: FormGroup;
  
  body = {
    example:''
  }
  constructor( private _dataControlService:DataControlService) { }

  ngOnInit(): void {
    this.workPackageForm = new FormGroup({
      acronym: new FormControl(null),
      name: new FormControl(null),
      pathway_content: new FormControl(null),
      is_global: new FormControl(true),
      id: new FormControl(null),
      active: new FormControl(true),
    });
    this._dataControlService.showCountries = true;
    this._dataControlService.showRegions = true;
  }
  

}
