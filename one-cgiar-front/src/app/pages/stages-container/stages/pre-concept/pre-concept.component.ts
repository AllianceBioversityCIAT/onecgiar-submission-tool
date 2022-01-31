import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-concept',
  templateUrl: './pre-concept.component.html',
  styleUrls: ['./pre-concept.component.scss']
})
export class PreConceptComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate([this.router.url,'general-information'])
  }

}
