import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-proposal',
  templateUrl: './full-proposal.component.html',
  styleUrls: ['./full-proposal.component.scss']
})
export class FullProposalComponent implements OnInit {
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    console.log("FPPPPPPP")
    console.log(this.router.url)
    this.router.navigate([this.router.url,'general-information'])
  }





}
