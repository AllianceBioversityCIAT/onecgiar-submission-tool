import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-research-governance',
  templateUrl: './research-governance.component.html',
  styleUrls: ['./research-governance.component.scss']
})
export class ResearchGovernanceComponent implements OnInit {

  constructor(
   public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
  }

  saveSection(){
    
  }

}
