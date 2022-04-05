import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-toc-button',
  templateUrl: './edit-toc-button.component.html',
  styleUrls: ['./edit-toc-button.component.scss']
})
export class EditTocButtonComponent implements OnInit {
  @Input() title: string = 'Edit';
  @Input() url: string = null;
  imageLoad : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
