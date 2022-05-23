import { Injectable } from '@angular/core';
import { environment } from '../../..//environments/environment';
import { HttpClient } from '@angular/common/http';

declare const Pusher: any;

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  pusher: any;
  channel: any;
  presenceChannel: any;

  constructor(private http: HttpClient) {


  }

 start(routeOst, userId){

  console.log(routeOst, userId);
  

  this.pusher = new Pusher(environment.pusher.key, {
    authEndpoint: `${environment.apiUrl}/auth/pusherauth/${userId}`,
    cluster: environment.pusher.cluster,
    encrypted: true,
  });
  this.channel = this.pusher.subscribe('events-channel');
  this.presenceChannel = this.pusher.subscribe('presence-ost'+routeOst);

 }

  updateStatus(tocStatus) {
    this.http
      .post(`${environment.apiUrl}/auth/pusher/update`, { tocStatus: tocStatus })
      .subscribe((data) => {});
  }
}
