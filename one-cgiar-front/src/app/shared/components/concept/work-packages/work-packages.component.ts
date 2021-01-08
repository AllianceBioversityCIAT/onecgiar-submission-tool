import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  constructor(public _requests: RequestsService) { }

  ngOnInit(): void {
  }

  onSave(informationForm): void {
    console.log("GUARDANDO",informationForm.value);
  }

}
