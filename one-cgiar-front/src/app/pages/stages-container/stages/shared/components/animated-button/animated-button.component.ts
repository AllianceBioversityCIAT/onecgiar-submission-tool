import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-button',
  templateUrl: './animated-button.component.html',
  styleUrls: ['./animated-button.component.scss']
})
export class AnimatedButtonComponent implements OnInit {
  @Input() title: string = 'Unnamed';
  constructor() { }

  ngOnInit(): void {
  }

}
