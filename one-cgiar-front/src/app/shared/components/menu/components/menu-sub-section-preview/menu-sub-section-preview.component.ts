import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-sub-section-preview',
  templateUrl: './menu-sub-section-preview.component.html',
  styleUrls: ['./menu-sub-section-preview.component.scss']
})
export class MenuSubSectionPreviewComponent implements OnInit {
  @Input() section;
  constructor() { }

  ngOnInit(): void {
  }

}
