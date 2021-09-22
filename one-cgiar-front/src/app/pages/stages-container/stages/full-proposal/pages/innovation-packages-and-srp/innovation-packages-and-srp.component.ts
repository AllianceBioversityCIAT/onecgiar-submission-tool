import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-innovation-packages-and-srp',
  templateUrl: './innovation-packages-and-srp.component.html',
  styleUrls: ['./innovation-packages-and-srp.component.scss']
})
export class InnovationPackagesAndSrpComponent implements OnInit {
  secionForm: FormGroup;
  showForm = true;
  constructor(
    public _initiativesService:InitiativesService
  ) {
    this.secionForm = new FormGroup({
      example: new FormControl(null),
    });
   }

  ngOnInit(): void {
  }

  saveSection(){

  }

}
