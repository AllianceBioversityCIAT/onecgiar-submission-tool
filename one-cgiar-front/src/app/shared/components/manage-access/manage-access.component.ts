import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    public dialogRef: MatDialogRef<ManageAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public initiativesSvc: InitiativesService,
    public activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
   this.getAllUsers();
   this.getAllRoles();
   this.getUsersByInitiative();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllUsers(){
    this.initiativesSvc.getAllUsers().subscribe(users=>{
      this.allUsers = users.data;
      console.log(this.allUsers);
      for (const user of  this.allUsers) {
        user.firstN_lastN_email = user.first_name+' '+user.last_name+'  -  '+ user.email;
        user.userId = user.id;
        user.active = user.is_active;
      }
    })
  }

  getAllRoles(){
    this.initiativesSvc.getAllRoles().subscribe(roles=>{
      this.allRoles = roles.data;
      for (let index = 0; index < this.allRoles.length; index++) {
        if (this.allRoles[index].acronym == "ADM" && this.allRoles[index].id == 1) {
          this.allRoles.splice(index,1)
        }
      }
    })
  }

  removeInactiveUsers(){
    for (let index = this.selectedUsers.length-1; index >= 0; index--) {
      if (this.selectedUsers[index].active == 0) {
        console.log('%c'+this.selectedUsers[index].first_name,'background: #222; color: #fd8484');
        this.selectedUsers.splice(index,1);
      }
    }
  }

  getUsersByInitiative(){
    this.initiativesSvc.getUsersByInitiative(this.initiativesSvc.initvStgId).subscribe(resp=>{
      this.selectedUsers = resp.response.users;
      this.showForm=true;
      console.log(resp.response.users);
      this.removeInactiveUsers();
    })
  }
}
