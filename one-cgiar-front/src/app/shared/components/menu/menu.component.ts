import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { RequestsService } from '@app/shared/services/requests.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  panelOpenPC = false;
  panelOpenC = false;
  panelOpenWP = false;
  panelOpenFP = false;

  workPackages = [
    {
      name: 'Work package 1',
      id: 1
    }
  ];
  activeLink = this.workPackages[0];

  route = "/create-initiative/work-packages-c/"

  addLink() {
    let data = {
      name: '',
      id: 999
    }
    data.name = `Work package ${this.workPackages.length + 1}`;
    data.id = this.workPackages.length + 1;
    this.workPackages.push(data);
    // this.workPackages.push(`Work package ${this.workPackages.length + 1}`);
  }

  constructor(public _auth: AuthService, public _requests: RequestsService) { }

  ngOnInit(): void {
  }

}
