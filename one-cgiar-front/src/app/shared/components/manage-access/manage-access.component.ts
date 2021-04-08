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
  addCoordinatorActive=false;
  allUsers=[];
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

  addCoordinator(){
    this.addCoordinatorActive = ! this.addCoordinatorActive
    console.log("addCoordinator()");
  }

  getAllUsers(){
    this.initiativesSvc.getAllUsers().subscribe(users=>{
      console.log(users.data);
      this.allUsers = users.data;
    })
  }

  getAllRoles(){
    this.initiativesSvc.getAllRoles().subscribe(roles=>{
      console.log(roles.data);
      this.allRoles = roles.data;
    })
  }

}
