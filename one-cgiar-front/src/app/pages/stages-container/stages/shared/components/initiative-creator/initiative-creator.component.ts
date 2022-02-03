import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initiative-creator',
  templateUrl: './initiative-creator.component.html',
  styleUrls: ['./initiative-creator.component.scss']
})
export class InitiativeCreatorComponent implements OnInit {
  renderDilog: boolean = false;
  display: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showDialog() {
      this.renderDilog = true;
      this.display = true;
  }

}
