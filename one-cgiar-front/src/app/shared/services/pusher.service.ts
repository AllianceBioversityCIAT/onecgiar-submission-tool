import { Injectable } from '@angular/core';
import { environment } from '../../..//environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router:Router
    ) {


  }

  beforeRoute = null;

  membersList = [];
  continueEditing = false;
  firstUser = false;
  validaeFirstUserToEdit(){
    let {members, myID} = this.presenceChannel?.members;

    if (!Object.keys(members).length) return true;
    console.log(members)

    let membersList:any = []

    Object.keys(members).map(item=>{
      const date = new Date(members[item]?.today);
      membersList.push({userId:item, date})
    })

    const sortByDate = arr => {
      const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      arr.sort(sorter);
    };

    sortByDate(membersList);
    this.membersList = membersList;
    return membersList[0]?.userId == myID
  }

 start(OSTRoute:string, userId){
  if (this.beforeRoute) this.pusher.unsubscribe('presence-ost'+this.beforeRoute);
    
    OSTRoute = OSTRoute.split('/').join("").split("-").join("");
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: `${environment.apiUrl}/auth/pusherauth/${userId}`,
      cluster: environment.pusher.cluster,
      encrypted: true,
    });
    // this.channel = this.pusher.subscribe('events-channel');
    this.presenceChannel = this.pusher.subscribe('presence-ost'+OSTRoute);

    this.beforeRoute = OSTRoute; 

    // setTimeout(() => {
    //   console.log("cerrar: " + OSTRoute)
    //  
    // }, 5000);

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
