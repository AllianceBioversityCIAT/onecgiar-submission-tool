import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';
import { MaVariablesService } from './services/ma-variables.service';

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
  
  selectedUsers=[]
  allRoles=[];
  showForm=false;
  tabNumber=0;
  rolesLoaded = false;
  usersLoaded = false;
  updateRolesButtonDisabled = true;
  constructor(
    public dialogRef: MatDialogRef<ManageAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public initiativesSvc: InitiativesService,
    private _initiativesService:InitiativesService,
    private _interactionsService:InteractionsService,
    public _maVariablesService:MaVariablesService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
   this.getAllRoles().then(()=>{
    this.getUsersByInitiative();
  }).catch((err)=>{

  });


   
  }

  getAllUsers(){
    this.initiativesSvc.getAllUsers().subscribe(resp=>{
      this._maVariablesService.allUsers = resp.response.users;
      console.log(this._maVariablesService.allUsers)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reloadSelectRoleComp(){
    this.getAllRoles().then(()=>{
      this.getUsersByInitiative();
      this.showForm = false;
      setTimeout(() => {
      this.showForm = true;
      }, 500);
    }).catch((err)=>{

    });
    
  }

  async getAllRoles(){

    return new Promise((resolve, reject) => { 

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
        resolve(null)
      },err=>{reject()},()=>{this.rolesLoaded = true})


     })
    

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
    // console.log(this.initiativesSvc.initvStgId);
    this.initiativesSvc.getUsersByInitiative(this.initiativesSvc.initiative.id).subscribe(resp=>{
      this.selectedUsers = resp.response.users;
      this.showForm=true;
      this.removeInactiveUsers();
      this.validate_repeat_leads();
      // console.log(resp.response.users);
    },err=>{},()=>{this.usersLoaded = true})
  }

  validate_repeat_leads(){

    let counter = {
      lead:0,
      deputy:0
    }
    this.selectedUsers.map(user=>{
      delete user.invalid
      counter.lead = user.roleId == 2 ? (counter.lead+1) : counter.lead;
      counter.deputy = user.roleId == 3 ? (counter.deputy+1) : counter.deputy;
    })

    this.mapInvalid(counter);
  }

  mapInvalid(counter){
    if (counter.lead>1 || counter.deputy >1) {
      this.updateRolesButtonDisabled = true;
      this.selectedUsers.map(user=>{
        user.invalid = counter.lead>1 && user.roleId == 2 ? true : user.invalid ;
        user.invalid = counter.deputy>1 && user.roleId == 3 ? true : user.invalid ;
      })
    }else{
      this.updateRolesButtonDisabled = false;
    }
  }

  assignRolesOrUpdate(){
    
    console.log(this.selectedUsers)
    let usersToUpdate = [];

    this.selectedUsers.map(user=>{
      // console.log(user)
      let {userId, roleId, active} = user
      let body = {
        active,
        userId,
        roleId: roleId ? roleId:5
      }
      console.log(body)

      this._initiativesService.assignUserToInitiative(body,this._initiativesService.initiative.id).subscribe(resp=>{
        console.log(resp);
      });

    })

    this._interactionsService.successMessage(`Updated users and roles`);
  }

  firstTab(){
    this.tabNumber=0; 
  }
}
