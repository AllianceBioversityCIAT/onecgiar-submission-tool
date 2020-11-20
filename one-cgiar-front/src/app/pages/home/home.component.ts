import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
}
