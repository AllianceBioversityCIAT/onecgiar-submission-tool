import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InitiativesService } from '../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  usersList = [];
  constructor( private _interactionsService:InitiativesService) { }

  ngOnInit(): void {
    this.getUsersWithInitiativesInformation();
  }

  getUsersWithInitiativesInformation(){
    this._interactionsService.getUsersWithInitiativesInformation().subscribe(resp=>{
      this.usersList = resp.data;
      this.usersList.map(user=>{user.name = user.first_name + ' '+ user.last_name})
      console.log(this.usersList)
    })
  }

  clear(table: Table) {
    table.clear();
}

}
