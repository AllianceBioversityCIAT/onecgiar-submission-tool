import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-result-framework',
  templateUrl: './result-framework.component.html',
  styleUrls: ['./result-framework.component.scss']
})
export class ResultFrameworkComponent implements OnInit {

  constructor(
    public _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
  }



}
