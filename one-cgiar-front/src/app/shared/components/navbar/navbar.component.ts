import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isUser: boolean = false;
  public user: any = null; 
  constructor(public authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      console.log('OnInit', user);
      this.isUser = true;
      this.user = user;
    })
  }

  onExit(): void {
    this.authSvc.logout();
  }

}
