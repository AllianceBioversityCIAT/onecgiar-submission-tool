import { Component, OnInit } from '@angular/core';
import { RequestsService } from '@app/shared/services/requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  constructor(public _requests: RequestsService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp => {
      this._requests.urlId = resp['id'];
      console.log(resp['id']);
    })
  }

  onSave(informationForm): void {
    console.log("GUARDANDO", informationForm.value);
  }

}
