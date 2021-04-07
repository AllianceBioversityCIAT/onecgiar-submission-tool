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
  rolesExample=[1];
  allUsers=[];
  constructor(
    public dialogRef: MatDialogRef<ManageAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public initiativesSvc: InitiativesService,
  ) { }

  ngOnInit(): void {
   this.getAllUsers();
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
      console.log(users);
      this.allUsers = users.data;
    })
  }

}
