import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitiativesService } from '@app/shared/services/initiatives.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.scss']
})
export class ManageAccessComponent implements OnInit {
  allUsers=[];
  selectedUsers=[]
  allRoles=[];
  selectedRoles=[
    {
      acronym: "PI",
      created_at: "2021-04-05T14:31:51.000Z",
      description: "Initiative Coordinator",
      id: 3,
      name: "pi",
      updated_at: "2021-04-05T14:31:51.000Z",
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<ManageAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public initiativesSvc: InitiativesService,
  ) { }

  ngOnInit(): void {
   this.getAllUsers();
   this.getAllRoles();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCoordinator(user){
    console.log("addCoordinator");
      // this.searchText = "";
      this.selectedUsers.push(user);
      console.log(user);
  }

  getAllUsers(){
    this.initiativesSvc.getAllUsers().subscribe(users=>{
      console.log(users.data);
      this.allUsers = users.data;
      for (const user of  this.allUsers) {
        user.firstN_lastN_email = user.first_name+' '+user.last_name+'  -  '+ user.email;
      }
    })
  }

  getAllRoles(){
    this.initiativesSvc.getAllRoles().subscribe(roles=>{
      console.log(roles.data);
      this.allRoles = roles.data;
      for (const rol of  this.allRoles) {
        rol.acronym_description = rol.acronym+' - '+rol.description;
      }
    })
  }

}
