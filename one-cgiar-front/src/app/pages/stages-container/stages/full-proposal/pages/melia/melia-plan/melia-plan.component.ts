import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-melia-plan',
  templateUrl: './melia-plan.component.html',
  styleUrls: ['./melia-plan.component.scss']
})
export class MeliaPlanComponent implements OnInit {
  meliaPlanForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    this.meliaPlanForm = new FormGroup({
      example: new FormControl(null),
    });
  }

}
