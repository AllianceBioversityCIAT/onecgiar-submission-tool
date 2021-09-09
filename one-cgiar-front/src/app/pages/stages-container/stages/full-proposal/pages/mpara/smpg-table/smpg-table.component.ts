import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-smpg-table',
  templateUrl: './smpg-table.component.html',
  styleUrls: ['./smpg-table.component.scss']
})
export class SmpgTableComponent implements OnInit {

  constructor(
    public _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
  }

}
