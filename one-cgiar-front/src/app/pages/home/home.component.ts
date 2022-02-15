import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InitiativesService } from '../../shared/services/initiatives.service';
import { ClarisaService } from '../../shared/services/clarisa.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isUser: boolean = false;
  public user: any = null;
  public data: any = [];
  public role: string = null;
  showTable = false;
  constructor(public authSvc: AuthService, public initiativesSvc: InitiativesService, private spinnerService: NgxSpinnerService, private _clarisaService:ClarisaService) { }

  ngOnInit(): void {    
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.user = user;
        let roles = this.user.roles.find(role => role.acronym);
        this.role = roles.acronym;
        this.getInitiatives();

      }
    })
    this.getStages();
  }



  getInitiatives() {
    this.spinnerService.show();
      this.initiativesSvc.getAllInitiatives().subscribe(data => {
        this.data = data;
        // console.log(data);
        // data.map(item=>{
        //   if (item.stageId == 3) {
        //     this.data.push(item)
        //     // console.log(item);
        //   }
        // })
        this.showTable = true;
        
      },err=>{console.log(err);},
      ()=>{this.spinnerService.hide();});

  }


  getStages() {
    this.initiativesSvc.getStages()
      .subscribe(
        resp => {
          // console.log(resp);
        }
      )
  }


}