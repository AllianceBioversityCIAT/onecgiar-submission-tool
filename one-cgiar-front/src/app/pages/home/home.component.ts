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
  constructor(
    public authSvc: AuthService, 
    public initiativesSvc: InitiativesService, 
    private spinnerService: NgxSpinnerService, 
    private _clarisaService:ClarisaService,
    private _initiativesService:InitiativesService) { }

  ngOnInit(): void {  
    this.initiativesSvc.initiative.id = null;
    this.initiativesSvc.initiative.stageId = null;
    this.initiativesSvc.initiative.stageName = null;
    this.initiativesSvc.initiative.exactStageName = null;
    this._initiativesService.setTitle('Home'); 
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.user = user;
        let roles = this.user.roles.find(role => role.acronym);
        this.role = roles.acronym;
        this.getInitiatives();

      }
    })
  }



  getInitiatives() {
    this.spinnerService.show();
      this.initiativesSvc.getAllInitiatives().subscribe(data => {
        this.data = data;
        data.map((initiative:any)=>{
          initiative.acronym_and_name = initiative?.acronym ? (initiative.acronym +  ' - ' + initiative.name) : initiative.name; 
        })
        // data.map(item=>{
        //   if (item.stageId == 3) {
        //     this.data.push(item)
        //     // console.log(item);
        //   }
        // })
        this.showTable = true;
        
      },err=>{console.log(err);this.spinnerService.hide();},
      ()=>{this.spinnerService.hide();});

  }

}