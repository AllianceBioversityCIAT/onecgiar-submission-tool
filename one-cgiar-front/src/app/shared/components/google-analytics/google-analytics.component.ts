import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-google-analytics',
  templateUrl: './google-analytics.component.html',
  styleUrls: ['./google-analytics.component.scss']
})
export class GoogleAnalyticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var script = document.createElement('script');
    script.onload = () => {
      // console.log("Script loaded and ready");
    };
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`;
    document.getElementsByTagName('head')[0].appendChild(script);

    
    var script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${environment.googleAnalyticsId}');
    `;
    document.getElementsByTagName('head')[0].appendChild(script2);

  }

}
