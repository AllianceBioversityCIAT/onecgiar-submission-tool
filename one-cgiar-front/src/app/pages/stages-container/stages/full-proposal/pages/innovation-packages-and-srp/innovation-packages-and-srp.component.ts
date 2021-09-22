import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-innovation-packages-and-srp',
  templateUrl: './innovation-packages-and-srp.component.html',
  styleUrls: ['./innovation-packages-and-srp.component.scss']
})
export class InnovationPackagesAndSrpComponent implements OnInit {
  showForm = true;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
  }

  saveSection(){

  }

}
