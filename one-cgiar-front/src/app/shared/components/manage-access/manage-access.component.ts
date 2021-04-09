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
      this.allUsers = users.data;
      for (const user of  this.allUsers) {
        user.firstN_lastN_email = user.first_name+' '+user.last_name+'  -  '+ user.email;
        user.roles=[
          {
            acronym: "CO",
            acronym_description: "CO - Initiative coordinator user",
            description: "Initiative coordinator user",
            id: 5,
            name: "Coordinator",
          }
        ];
      }
    })
  }

  getAllRoles(){
    this.initiativesSvc.getAllRoles().subscribe(roles=>{
      console.log(roles.data);
      this.allRoles = roles.data;
      // this.allRoles.splice(0,1)
      for (let index = 0; index < this.allRoles.length; index++) {
        if (this.allRoles[index].acronym == "ADM" && this.allRoles[index].id == 1) {
          this.allRoles.splice(index,1)
        }
      }
      for (const rol of  this.allRoles) {
        rol.acronym_description = rol.acronym+' - '+rol.description;
      }
    })
  }

}
