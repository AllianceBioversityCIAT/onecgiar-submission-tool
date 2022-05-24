import { Component, isDevMode, OnInit } from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-dev-tag',
  templateUrl: './dev-tag.component.html',
  styleUrls: ['./dev-tag.component.scss']
})
export class DevTagComponent implements OnInit {
  show=false;
  horizonalPosition=true;
  constructor() { }

  ngOnInit(): void {
    this.show = isDevMode();
  }

  moveToggle(){
   this.horizonalPosition= !this.horizonalPosition;
  }

}
