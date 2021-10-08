import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-full-initiative-toc',
  templateUrl: './full-initiative-toc.component.html',
  styleUrls: ['./full-initiative-toc.component.scss']
})
export class FullInitiativeTocComponent implements OnInit {
  sectionForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService
  ) {
    this.sectionForm = new FormGroup({
      example: new FormControl(null)
    });
   }

  ngOnInit(): void {
  }

}
