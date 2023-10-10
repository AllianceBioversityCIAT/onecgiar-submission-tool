import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../shared/services/initiatives.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.scss'],
})
export class BiComponent implements OnInit {
  constructor(
    private _initiativesService: InitiativesService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._initiativesService.setTitle('BI');
  }

  saniUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(environment.biUrl);
  }
}
