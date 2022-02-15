import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../../services/initiatives.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-geographic-scope',
  templateUrl: './geographic-scope.component.html',
  styleUrls: ['./geographic-scope.component.scss']
})
export class GeographicScopeComponent implements OnInit {

  globalDimension;
  @Input() workPackageData: any;
  constructor(
    public _auth:AuthService,
    public initiativesSvc: InitiativesService
    ) { }

  ngOnInit(): void {
    this.globalDimension = this.workPackageData.is_global;
  }

  updateWorkPackage(resp): void {
    this.initiativesSvc.updateWorkPackage({id:this.workPackageData.id,isGlobal:resp}).subscribe(resp=>{
      console.log(resp);
    });
  }

}
