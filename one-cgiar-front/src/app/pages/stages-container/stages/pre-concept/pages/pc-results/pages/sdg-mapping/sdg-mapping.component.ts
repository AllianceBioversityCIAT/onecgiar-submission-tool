import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-sdg-mapping',
  templateUrl: './sdg-mapping.component.html',
  styleUrls: ['./sdg-mapping.component.scss']
})
export class SdgMappingComponent implements OnInit {
  sdgMappingList = [];

  constructor(public  _initiativesService:InitiativesService) { }

  ngOnInit(): void {
  }

}
