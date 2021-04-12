import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-rol-user',
  templateUrl: './edit-rol-user.component.html',
  styleUrls: ['./edit-rol-user.component.scss']
})
export class EditRolUserComponent implements OnInit {
  @Input() user;
  @Input() roles;
  public userRolForm: FormGroup;
  constructor() { 
    this.userRolForm = new FormGroup({
      userId: new FormControl(''),
      roleId: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

}
