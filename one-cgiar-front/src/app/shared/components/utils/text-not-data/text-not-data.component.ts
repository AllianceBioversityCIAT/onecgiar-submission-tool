import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-not-data',
  templateUrl: './text-not-data.component.html',
  styleUrls: ['./text-not-data.component.scss']
})
export class TextNotDataComponent implements OnInit {
  @Input() text:string;
  constructor() { }

  ngOnInit(): void {
  }

}
