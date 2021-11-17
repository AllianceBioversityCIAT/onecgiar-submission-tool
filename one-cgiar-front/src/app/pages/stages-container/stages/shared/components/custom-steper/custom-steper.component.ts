import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface RouteData{
  route:string;
  title:string;
}

interface Steper{
  routes:RouteData[];
}

@Component({
  selector: 'app-custom-steper',
  templateUrl: './custom-steper.component.html',
  styleUrls: ['./custom-steper.component.scss']
})
export class CustomSteperComponent implements OnInit {
  @Input() options:Steper;

  constructor(
    public router:Router
  ) { }

  ngOnInit(): void {}

}
