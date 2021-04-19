import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
  @Input() disabled;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
    
  }

}
