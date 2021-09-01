import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-pob-impact-area',
  templateUrl: './pob-impact-area.component.html',
  styleUrls: ['./pob-impact-area.component.scss']
})
export class PobImpactAreaComponent implements OnInit {
  checked: boolean = true;
  pobImpactAreaForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    this.pobImpactAreaForm = new FormGroup({
      action_area_id: new FormControl(null),
      contextId:new FormControl(null),
    });
  }

}
