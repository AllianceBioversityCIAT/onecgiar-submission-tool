import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-tawk-to',
  templateUrl: './tawk-to.component.html',
  styleUrls: ['./tawk-to.component.scss']
})
export class TawkToComponent implements OnInit {
  @Input() id: string; // Not used
  script = this._renderer.createElement('script');
  isVisibleTawk = true;
  // currentUser: User;
  // config = environment;


  constructor(private _renderer: Renderer2, @Inject(DOCUMENT) private _document, private authService: AuthService) {
    // this.authService.currentUser.subscribe(x => {
    //   this.currentUser = x;
    //   console.log(this.currentUser);
      
    // });

  }

  ngOnInit() {
    // if(this.currentUser && this.currentUser.roles[0].id != 3) {
    console.log("heloo Tawk_API");
      this.script.text = `var Tawk_API = Tawk_API || {},  Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/615313c9d326717cb683b81e/1fgm8aj51';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
      Tawk_API.visitor = {
      name  : '',
      email : ''
      };`;
      this._renderer.appendChild(this._document.body, this.script);
      setTimeout(() => {
        this.openChat();
        this.setLoggedUser()
      }, 200);
    // }

  }

  openChat() {
    if (window['Tawk_API'].hasOwnProperty('maximize')) {
      window['Tawk_API'].maximize();
    }

  }

  setLoggedUser() {
    if (window['Tawk_API'].hasOwnProperty('visitor')) {
      // console.log(window['Tawk_API'])
      // window['Tawk_API'].setAttributes({
      //   name: this.currentUser.username,
      //   email: this.currentUser.email
      // }, function (error) {
      //   console.log(error)
      // });
      // window['Tawk_API'].onLoad = function () {
      //   window['Tawk_API'].setAttributes({
      //     name: this.currentUser.username,
      //     email: this.currentUser.email
      //   }, function (error) {
      //     console.log(error)
      //   });
      // };

    }
  }

}
