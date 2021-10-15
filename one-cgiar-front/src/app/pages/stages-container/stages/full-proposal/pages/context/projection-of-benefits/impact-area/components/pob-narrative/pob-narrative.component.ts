import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-pob-narrative',
  templateUrl: './pob-narrative.component.html',
  styleUrls: ['./pob-narrative.component.scss']
})
export class PobNarrativeComponent implements OnInit {
  @Input() pobImpactAreaForm;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
  }

}
