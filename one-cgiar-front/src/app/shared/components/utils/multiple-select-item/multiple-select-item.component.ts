import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-select-item',
  templateUrl: './multiple-select-item.component.html',
  styleUrls: ['./multiple-select-item.component.scss']
})
export class MultipleSelectItemComponent implements OnInit {
  @Input() object: any;
  @Input() attr: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.object);
  }

}
