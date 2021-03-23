import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitiativesService } from '@app/shared/services/initiatives.service';
@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages.component.html',
  styleUrls: ['./work-packages.component.scss']
})
export class WorkPackagesComponent implements OnInit {

  workPackagesList=[];


  constructor(public activatedRoute: ActivatedRoute, public initiativesSvc: InitiativesService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp => {
      this.initiativesSvc.getAllIWorkPackages(resp['id']).subscribe(resp => {
        this.workPackagesList = resp.response.workPackages;
        console.log('resp', this.workPackagesList);
      })
    })
  }

}
