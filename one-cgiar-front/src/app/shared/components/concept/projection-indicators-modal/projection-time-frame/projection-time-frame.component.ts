import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-projection-time-frame',
  templateUrl: './projection-time-frame.component.html',
  styleUrls: ['./projection-time-frame.component.scss']
})
export class ProjectionTimeFrameComponent implements OnInit {
  projectionTimeFrameForm: FormGroup;
  @Input() data;
  constructor() {
    this.projectionTimeFrameForm = new FormGroup({
      low_scenario: new FormControl(null,Validators.required),
      high_scenario: new FormControl(null,Validators.required),
      year: new FormControl(null,Validators.required),
      id: new FormControl(null),
    });
   }


  ngOnInit(): void {

  }



}
