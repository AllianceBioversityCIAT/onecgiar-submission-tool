import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../services/initiatives.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-toc-button',
  templateUrl: './edit-toc-button.component.html',
  styleUrls: ['./edit-toc-button.component.scss'],
})
export class EditTocButtonComponent implements OnInit {
  @Input() title: string = 'Edit';
  imageLoad: boolean = false;
  constructor(
    public _initiativesService: InitiativesService,
    public _authService: AuthService
  ) {}

  ngOnInit(): void {}

  showButton() {
    setTimeout(() => {
      this.imageLoad = true;
    }, 1000);
  }
}
