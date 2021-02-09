import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { InitiativesService } from '../../shared/services/initiatives.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isUser: boolean = false;
  public user: any = null;
  public data: any = [];

  constructor(public authSvc: AuthService, public initiativesSvc: InitiativesService) { }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      console.log('OnInit', user);
      this.isUser = true;
      this.user = user;
      this.getInitiatives();
    })
    // let body = {
    //   name: "Initial Concept: Test Third from VSC",
    //   challenge: "this is a challenge example",
    //   objectives: "these are the objectives: 1, 2 3",
    //   results: "these are the results ",
    //   highlights: "123",
    //   action_area_description: "Action Area description",
    //   action_area_id: "1",
    //   initvStgId: 18
    // };
    // console.log(body);
    // this.initiativesSvc.getActionAreaById(Number(body.action_area_id)).subscribe(resp => {
    //   console.log('resp',resp);
    //   this.initiativesSvc.postConcept(body, resp).subscribe(resp => {
    //     console.log('concept', resp);
    //   })
    // })
  }

  getInitiatives() {
    if (this.user.roles.find(role => role.acronym == 'ADM')) {
      this.initiativesSvc.getAllInitiatives().subscribe(data => {
        this.data = data.data;
        console.log('getInitiatives', this.data);
      });
    } else {
      this.initiativesSvc.getInitiativesByUser().subscribe(data => {
        this.data = data.data;
        console.log('getInitiativesByUser', this.data);
      });
    }

  }

}