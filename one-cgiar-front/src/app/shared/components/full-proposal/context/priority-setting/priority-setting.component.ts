import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../services/initiatives.service';

@Component({
  selector: 'app-priority-setting',
  templateUrl: './priority-setting.component.html',
  styleUrls: ['./priority-setting.component.scss']
})
export class PrioritySettingComponent implements OnInit {
  sectionForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) {
    this.sectionForm = new FormGroup({
      challengeStatement: new FormControl(''),
    });
   }

  ngOnInit(): void {
  }
  upserInfo(){
    
  }

}
