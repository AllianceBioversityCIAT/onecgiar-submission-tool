import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-select-item',
  templateUrl: './multiple-select-item.component.html',
  styleUrls: ['./multiple-select-item.component.scss']
})
export class MultipleSelectItemComponent implements OnInit {
  @Input() object: any;
  @Input() attr: any;
  @Input() selectList: any[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  onRemove(){
    this.object.selected = false;
    this.object.active = false;
    this.selectList.find(item=> item.resultId == this.object.outcomeIdId)!.selected = false
  }

}
