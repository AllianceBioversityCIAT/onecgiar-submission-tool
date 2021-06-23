import { Component, Input, OnInit } from '@angular/core';
import { LinkListOptions } from '../../../models/forms-options/link-list-options.interface';

@Component({
  selector: 'custom-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {
  @Input() options:LinkListOptions;
  constructor() { }

  ngOnInit(): void {
  }

}
