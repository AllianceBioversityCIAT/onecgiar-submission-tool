import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'app-geographic-scope',
  templateUrl: './geographic-scope.component.html',
  styleUrls: ['./geographic-scope.component.scss']
})
export class GeographicScopeComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }

  onSave(generalInformationForm): void {
    console.log("GUARDANDO",generalInformationForm.value);
  }

}
