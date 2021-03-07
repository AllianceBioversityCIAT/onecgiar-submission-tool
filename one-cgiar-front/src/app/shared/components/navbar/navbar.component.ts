import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { LoggerService } from "@shared/services/logger.service";

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

  constructor(public authSvc: AuthService, private activeRoute: ActivatedRoute) { }

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
  }

}
