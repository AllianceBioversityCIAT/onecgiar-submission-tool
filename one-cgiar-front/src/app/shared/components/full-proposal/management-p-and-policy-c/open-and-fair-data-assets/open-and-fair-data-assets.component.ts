import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-open-and-fair-data-assets',
  templateUrl: './open-and-fair-data-assets.component.html',
  styleUrls: ['./open-and-fair-data-assets.component.scss']
})
export class OpenAndFAIRDataAssetsComponent implements OnInit {
  openAndFairDataAssetsForm: FormGroup;

  constructor() {
    this.openAndFairDataAssetsForm = new FormGroup({
      details: new FormControl(''),
    });
   }

  ngOnInit(): void {
  }

}
