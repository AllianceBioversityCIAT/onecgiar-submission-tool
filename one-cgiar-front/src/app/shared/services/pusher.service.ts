import { Injectable } from '@angular/core';
import { environment } from '../../..//environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { InitiativesService } from './initiatives.service';

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
    private _initiativesService:InitiativesService
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
      // console.log(membersList);
      membersList.push(
        {
          userId:item, 
          date:members[item]?.roles[0]['name'] !== "Guest" ? date : undefined,
          role:members[item]?.roles[0]['name'],
          name:members[item]['name'],
          nameinitials: this.textToinitials(members[item]['name'])
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
    return this._authService.lsUserRoles.id === 4 ? true : membersList[0]?.userId == myID;
  }

  textToinitials(text){
    return text.split(' ').map(item=>item[0]).join('');
  }

 start(OSTRoute:string, userId){
  if (this.beforeRoute) this.pusher.unsubscribe('presence-ost'+this.beforeRoute);
    
    OSTRoute = OSTRoute.split('/').join("").split("-").join("");
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: `${environment.apiUrl}/auth/pusherauth/${this._initiativesService.initiative.id}/${userId}`,
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
