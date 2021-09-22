import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-open-and-fair-data-assets',
  templateUrl: './open-and-fair-data-assets.component.html',
  styleUrls: ['./open-and-fair-data-assets.component.scss']
})
export class OpenAndFairDataAssetsComponent implements OnInit {
  secionForm: FormGroup;
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
