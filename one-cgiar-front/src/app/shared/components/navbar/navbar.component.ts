import { Component, OnInit } from '@angular/core';
import { InteractionsService } from '../../services/interactions.service';
import { AuthService } from '../../services/auth.service';
import { DataControlService } from '../../services/data-control.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isUser: boolean = false;
  public user: any = null;
  public name: string = null;
  public role: string = null;

  constructor(
    public authSvc: AuthService,
    public _interactionsService:InteractionsService,
    public _dataControlService:DataControlService
    ) { }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.user = user;
        let roles = this.user.roles?.find(role => role.name);
        this.name = this.user?.name;
        this.role = roles?.name;
      }

    })
  }

  onExit(): void {
    this.authSvc.logout();
    this.cleanTWKCookies();
     


    // document.querySelector('.Tawk_API_container').innerHTML = "";
  }

  cleanTWKCookies() {
    console.log("cleanTWKCookies")
    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      if (cookie?.split("=")[0]?.includes("twk")) {
        const eqPos = cookie.indexOf("=");
        console.log(cookie + ' ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
