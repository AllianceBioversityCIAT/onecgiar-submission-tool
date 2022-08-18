import { Injectable } from '@angular/core';
import { environment } from '../../..//environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { InitiativesService } from './initiatives.service';
import { DataControlService } from './data-control.service';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  presenceChannel: any;

  constructor(
    private http: HttpClient,
    private router:Router,
    private _authService:AuthService,
    private _initiativesService:InitiativesService,
    private _dataControlService:DataControlService
    ) {
  }

  beforeRoute = null;

  membersList = [];
  continueEditing = false;
  firstUser = false;
  secondUser = null;
  validaeFirstUserToEdit(){
    let {members, myID} = this.presenceChannel?.members;

    // if (this.firstUser) return true;
    if (!Object.keys(members).length) return true;
    // console.log(members)

    let membersList:any = []

    Object.keys(members).map(item=>{
      const date = new Date(members[item]?.today);
      let initiativeRoles:any[] = [];
      initiativeRoles = members[item]?.initiativeRoles;

      let generalRoles:any[] = [];
      generalRoles = members[item]?.roles; 

        // TODO: Tener ene cuenta estado de la iniciativa
      let oldDate = new Date("4000-05-31T20:40:34.081Z")
      // console.log(members)

        membersList.push(
          {
            userId:item, 
            date: initiativeRoles?.length ? (initiativeRoles[0]?.name !== "Guest" ? date : oldDate) :  generalRoles?.length ? (generalRoles[0]?.name == "Admin" ? date :  oldDate) : oldDate,
            role: this._initiativesService.initiative.status == 'Approved' ? 'Guest' :(initiativeRoles?.length ? initiativeRoles[0]?.name : generalRoles?.length ? generalRoles[0]?.name == "Admin" ? generalRoles[0]?.name:'Guest': 'Guest'),
            name: members[item]?.name,
            nameinitials: this.textToinitials(members[item]?.name)
          }
        );
     

    })

    const sortByDate = arr => {
      const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      arr.sort(sorter);
    };

    sortByDate(membersList);
    this.membersList = membersList;
    // console.log(this.membersList)
    this.firstUser = membersList[0]?.userId == myID;
    // console.log(this.firstUser +' - '+this.secondUser)
    if (!this.firstUser)this.secondUser = true;
    if (this.firstUser && this.secondUser) {
      let currentUrl = this.router.url;
      this.router.navigateByUrl(`/initiatives/${this._initiativesService.initiative.id}/stages/${this._initiativesService.initiative.exactStageName}`).then(()=>{
        setTimeout(() => {
          this.router.navigateByUrl(currentUrl)
        }, 100);
      });

    }
    // console.log(this.firstUser +' -- '+this.secondUser)
    // console.log(this._initiativesService.initiative.userRoleName)
    // console.log(" ")
    // console.log(!!this._initiativesService.initiative.userRoleName)
    // console.log(this._authService.lsUserRoles.name)
    // console.log('--')
    // console.log(!this._initiativesService.initiative.userRoleName && this._authService.lsUserRoles.name == "Guest")
    return membersList[0]?.userId == myID || (!this._initiativesService.initiative.userRoleName && !this._authService.lsUserRoles.name) || (!this._initiativesService.initiative.userRoleName && this._authService.lsUserRoles.name == "Guest") || this._initiativesService.initiative.readonly;
  }

  textToinitials(text){
    return text.split(' ').map(item=>item[0]).join('');
  }

  // beforeTocChanel = ''
  listenTocChange(sectionName:string,callback, subItemId?: string | number){
    if (this.pusherToc) this.pusherToc.disconnect();
    
    this.instancePusher();
    const channelName = `${sectionName}-${this._initiativesService.initiative.id}${subItemId?`-${subItemId}`:``}`;
    const channel = this.pusherToc.subscribe(channelName);
    console.log(`In: ${channelName}`)
    channel.bind("updateToc", (data) => {
      callback();
    });

  }
  pusherToc: any;
  instancePusher(){
    this.pusherToc = new Pusher(environment.pusher.key, {
      authEndpoint: `${environment.apiUrl}/auth/pusherauth/${this._initiativesService.initiative}/${this._authService.userValue.id}`,
      cluster: environment.pusher.cluster,
      encrypted: true,
    });
  }

 start(OSTRoute:string, userId, initiativeId){
  if (this.beforeRoute) this.pusher.unsubscribe('presence-ost'+this.beforeRoute);
    
    OSTRoute = OSTRoute.split('/').join("").split("-").join("");
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: `${environment.apiUrl}/auth/pusherauth/${initiativeId}/${userId}`,
      cluster: environment.pusher.cluster,
      encrypted: true,
    });
    this.presenceChannel = this.pusher.subscribe('presence-ost'+OSTRoute);
    this.beforeRoute = OSTRoute; 
 }

 stop(){

  // this.pusher.unsubscribe('presence-ost'+OSTRoute);

 }

  updateStatus(tocStatus) {
    this.http
      .post(`${environment.apiUrl}/auth/pusher/update`, { tocStatus: tocStatus })
      .subscribe((data) => {});
  }
}
