import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { InteractionsService } from '../../services/interactions.service';

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
    public _interactionsService:InteractionsService
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
  }

}
