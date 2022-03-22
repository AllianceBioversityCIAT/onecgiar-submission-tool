import { Component, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tawk-to',
  templateUrl: './tawk-to.component.html',
  styleUrls: ['./tawk-to.component.scss']
})
export class TawkToComponent implements OnInit {
  @Input() id: string;
  script = this._renderer.createElement('script');
  isVisibleTawk = true;
  currentUser: any;
  config = environment;


  constructor(private _renderer: Renderer2, @Inject(DOCUMENT) private _document, private authService: AuthService) {
    this.authService.user$.subscribe(x => {
      this.currentUser = x;
    });

  }

  ngOnInit() {

    console.log(this.getUserInfo.name)
    console.log(this.getUserInfo.email)

    if (this.currentUser && this.currentUser.roles[0].id != 3) {

      this.script.text = `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src = 'https://embed.tawk.to/${this.config.tawkToId}';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
      

      Tawk_API.visitor = {
        name  : '${this.getUserInfo.name}',
        email : '${this.getUserInfo.email}'
      };
      `;
      this._renderer.appendChild(this._document.body, this.script);
      // setTimeout(() => {
      //   this.openChat();
      //   this.setLoggedUser()
      // }, 1500);
    }

  }



  get getUserInfo():{email,name}{
    return JSON.parse(localStorage.getItem('user'));
  }

  openChat() {
    if (window['Tawk_API'].hasOwnProperty('maximize')) {
      window['Tawk_API'].maximize();
    }

  }

  // setLoggedUser() {
  //   if (window['Tawk_API'].hasOwnProperty('visitor')) {
  //     if (window.hasOwnProperty('Tawk_API')) {
  //       if (window.hasOwnProperty('Tawk_API')) {
  //         if (window['Tawk_API'].isVisitorEngaged()) window['Tawk_API'].endChat();
  //         window['Tawk_API'].setAttributes({
  //           name:  this.currentUser.name,
  //           email:  this.currentUser.email
  //         }, function (error) {
  //           console.log(error)
  //         });
  //       }
  //     }
  //   }
  // }

}

