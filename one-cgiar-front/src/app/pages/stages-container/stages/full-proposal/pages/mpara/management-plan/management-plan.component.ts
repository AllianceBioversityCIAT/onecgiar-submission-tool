import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-management-plan',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss']
})
export class ManagementPlanComponent implements OnInit {
  managementPlanForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    this.managementPlanForm = new FormGroup({
      example: new FormControl(null),
    });
  }

}
