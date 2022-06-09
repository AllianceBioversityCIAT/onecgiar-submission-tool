import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { AuthService } from '../../services/auth.service';
import { PusherService } from '../../services/pusher.service';
import { DataControlService } from '../../services/data-control.service';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { InitiativesService } from '../../services/initiatives.service';
import { environment } from '../../../../environments/environment';
declare let gtag: (property: string, value: any, configs: any) => {};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isUser: boolean = false;
  public user: any = null;
  public name: string = null;
  public role: string = null;

  tocStatus: any = true;
  count: any;
  messages = [];
  constructor(
    public authSvc: AuthService,
    public _interactionsService: InteractionsService,
    public _dataControlService: DataControlService,
    public pusherService: PusherService,
    private router:Router,
    private _pusherService:PusherService,
    public _initiativesService:InitiativesService
  ) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.user = user;
        let roles = this.user.roles?.find((role) => role.name);
        this.name = this.user?.name;
        this.role = roles?.name;
      }
    });

    /**
     ** START SOCKET PRESENCE CHANEL
     */
    // Set route and user for identify users online
    // /initiatives/1/stages/full-proposal/general-information
    //  setTimeout(() => {
      // console.log(this.router.url)
    //  }, 1000);
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url.split('/')[2])
        if (!(event.url.split('/')[2])) return;
        this.pusherService.start(event.url, this.user.id, event.url.split('/')[2]);
        this.pusherService.membersList = [];
        this._pusherService.continueEditing = false;
        this._pusherService.firstUser = false;
        this._pusherService.secondUser = null;
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.url
        });
      }
 
    })




    // Get data from event socket
    // this.pusherService.channel.bind('new-status', (data) => {
    //   console.log(data);

    //   this.tocStatus = data.status;
    // });

  }

  getCurrentRole(){
    let initRole = this._initiativesService.initiative.userRoleName;
    let generalRole = this.authSvc?.lsUserRoles?.name;
    let role = initRole ? initRole : ( this.authSvc.lsUserRoles?.id == 1 ? this.authSvc.lsUserRoles?.name : '')
    return  role
  }



  onExit(): void {
    if (window['Tawk_API']) window['Tawk_API'].minimize();
    this.authSvc.logout();
    this.cleanTWKCookies();
    // document.querySelector('.Tawk_API_container').innerHTML = "";
  }

  /**
   * TODO Change this function
   */
  // ngDoCheck() {
  //   this.count = this.pusherService.presenceChannel.members.count;
  // }

  /**
   ** CALL EVENT SOCKET
   */
  updateOst() {
    this.tocStatus = false;
    this.pusherService.updateStatus(this.tocStatus);
  }

  cleanTWKCookies() {
    console.log('cleanTWKCookies');
    // window['Tawk_API'].endChat()

    var cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      if (cookie?.split('=')[0]?.includes('twk')) {
        const eqPos = cookie.indexOf('=');
        console.log(cookie + ' ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  addMemberToUserList(memberId) {
    const hashCode = (s) =>
      s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);

    let userEl = document.createElement('div');
    userEl.id = 'user_' + memberId;
    userEl.innerText = memberId;
    userEl.style.backgroundColor =
      'hsl(' + (hashCode(memberId) % 360) + ',70%,60%)';
    document.getElementById('user_list').appendChild(userEl);
  }
}
