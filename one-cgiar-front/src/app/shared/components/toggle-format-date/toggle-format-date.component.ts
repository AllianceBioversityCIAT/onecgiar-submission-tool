import { Component, Input, OnInit } from '@angular/core';
import { DataControlService } from '../../services/data-control.service';

@Component({
  selector: 'app-toggle-format-date',
  templateUrl: './toggle-format-date.component.html',
  styleUrls: ['./toggle-format-date.component.scss']
})
export class ToggleFormatDateComponent implements OnInit {
  @Input() date: string = "Not provided";
  constructor(public _dataControlService:DataControlService) { }

  ngOnInit(): void {
  }

}
