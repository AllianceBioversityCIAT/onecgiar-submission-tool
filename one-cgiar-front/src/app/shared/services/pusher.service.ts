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

 start(OSTRoute:string, userId){
  if (this.beforeRoute) this.pusher.unsubscribe('presence-ost'+this.beforeRoute);
  console.log("cerrar: " + this.beforeRoute)
    
    OSTRoute = OSTRoute.split('/').join("").split("-").join("");
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: `${environment.apiUrl}/auth/pusherauth/${userId}`,
      cluster: environment.pusher.cluster,
      encrypted: true,
    });
    // this.channel = this.pusher.subscribe('events-channel');
    this.presenceChannel = this.pusher.subscribe('presence-ost'+OSTRoute);
    console.log("canal: "+ OSTRoute)

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
