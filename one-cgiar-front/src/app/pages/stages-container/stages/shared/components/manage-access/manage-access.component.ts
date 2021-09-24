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
  initiative;
  showForm=false;
  tabNumber=0;
  rolesLoaded = false;
  usersLoaded = false;
  constructor(
    public dialogRef: MatDialogRef<ManageAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public initiativesSvc: InitiativesService,

  ) { }

  ngOnInit(): void {
   this.getAllRoles();
   this.getUsersByInitiative();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllRoles(){
    this.initiativesSvc.getAllRoles().subscribe(roles=>{
      this.allRoles = roles.data;
      // console.log(roles.data);
      for (let index = 0; index < this.allRoles.length; index++) {
        if (this.allRoles[index].acronym == "ADM" && this.allRoles[index].id == 1) {
          this.allRoles.splice(index,1)
        }
        if (this.allRoles[index].acronym == "GUEST" && this.allRoles[index].id == 4) {
          this.allRoles.splice(index,1)
        }
      }
    },err=>{},()=>{this.rolesLoaded = true})
  }

  removeInactiveUsers(){
    for (let index = this.selectedUsers.length-1; index >= 0; index--) {
      if (this.selectedUsers[index].active == 0) {
        // console.log('%c'+this.selectedUsers[index].first_name,'background: #222; color: #fd8484');
        this.selectedUsers.splice(index,1);
      }
    }
  }

  getUsersByInitiative(){
    console.log(this.initiativesSvc.initvStgId);
    this.initiativesSvc.getUsersByInitiative(this.initiativesSvc.initvStgId).subscribe(resp=>{
      this.selectedUsers = resp.response.users;
      this.showForm=true;
      this.removeInactiveUsers();
      console.log(resp);
    },err=>{},()=>{this.usersLoaded = true})
  }

  firstTab(){
    this.tabNumber=0; 
  }
}
