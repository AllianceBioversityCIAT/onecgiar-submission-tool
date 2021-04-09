import { Component, Input, OnInit } from '@angular/core';
import { textOptions } from '../../../models/forms-options/text-options.interface';

@Component({
  selector: 'custom-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() options:textOptions;
  constructor() { }

  ngOnInit(): void {
  }

}
