import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';
import { StagesMenuService } from '../../../services/stages-menu.service';

@Component({
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
  @Input() disabled;
  @Input() underConstruction = false;
  constructor(
    public _initiativesService:InitiativesService,
    public _StagesMenuService: StagesMenuService
  ) { }

  ngOnInit(): void {
    
  }

  validateSections(){
    console.log("validateSections");
    this._initiativesService.getGreenCheckStatus(this._initiativesService.initvStgId).subscribe(resp=>{
      this._StagesMenuService.validateAllSectionsStatus('concept',resp.response?.validatedSections,this._initiativesService.initvStgId);
    })
  }

}
