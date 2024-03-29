import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InteractionsService } from '../../../../../../shared/services/interactions.service';
import { InitiativesService } from '../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-edit-rol-user',
  templateUrl: './edit-rol-user.component.html',
  styleUrls: ['./edit-rol-user.component.scss']
})
export class EditRolUserComponent implements OnInit {
  @Input() user:any;
  @Input() roles;
  // @Input() selectedUsers;
  @Output() reload = new EventEmitter();
  colorChip="accent";
  activeExpand=-1;
  activeExpansion=false;
  CurrentRolChipName;
  isOpeneded=false;
  
  public userRolForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService,
    public dialog: MatDialog,
    public _interactions: InteractionsService
  ) { 
    this.userRolForm = new FormGroup({
      userId: new FormControl(''),
      roleId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.user.new) {
     console.log(this.user.first_name+' is new');
     this.assignUserGuestToInitiative();
    }
    if (this.user.roleId) {
      this.userRolForm.controls.roleId.setValue(this.user.roleId);
      this.getLocalRolById(this.user.roleId);
    }
    this.userRolForm.controls.userId.setValue(this.user.userId);
    this.userRolForm.valueChanges.subscribe(resp=>{
      this.getLocalRolById(resp.roleId);
      if (resp.roleId != this.user.roleId) {
       this._interactions.currentUserIdOnlyExpand=-1;
       this.colorChip="warn";
      }else{
       this.colorChip="accent";
       this._interactions.currentUserIdOnlyExpand=this.user.userId;
      }
    })

    setTimeout(() => {
      this.activeExpand = this._interactions.expandWithUserId;

    }, 500);
    
  }

  removeUserToInitiative(){
    this._interactions.animateButtonSave = false;
    if (!this.user.new) {
      let body={
        userId:this.user.userId,
        active:0,
        roleId:this.user.roleId
      }
      console.log(body);
      this._initiativesService.assignUserToInitiative(body,this._initiativesService.initvStgId).subscribe(resp=>{
        console.log(resp);
        this.reload.emit();
      });
    }else{
      this.user.active = false;
      this.reload.emit();
      this._interactions.expandWithUserId=-1;
    }

  }

  assignUserGuestToInitiative(){
    this._interactions.animateButtonSave = false;
    let body =  this.userRolForm.value;
    body.active = true;
    body.userId = this.user.userId;
    body.roleId = 4;
    this._initiativesService.assignUserToInitiative(body,this._initiativesService.initvStgId).subscribe(resp=>{
      console.log(resp);
      this._interactions.expandWithUserId=-1;
      this.reload.emit();
      this._interactions.disableAllExpandBool = false;
      this._interactions.animateButtonSave = false;
      this._interactions.successMessage('The user was added');
    });
  }




  assignUserToInitiative(){
    this._interactions.animateButtonSave = false;
    // console.log("assignUserToInitiative");
    // console.log(this.user);
    this.userRolForm.controls.userId.setValue(this.user.userId);
    // console.log(this.userRolForm.value);
    let body =  this.userRolForm.value;
    body.active = true;
    // console.log(this.userRolForm.value);
    // console.log(body);
    this._initiativesService.assignUserToInitiative(body,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
      this._interactions.expandWithUserId=-1;
      this.reload.emit();
      this._interactions.disableAllExpandBool = false;
      this._interactions.animateButtonSave = false;
      this._interactions.successMessage('The user role was updated');
    });
  }

  getLocalRolById(id){
    for (const rol of this.roles) {
      if (rol.id == id) {
        this.CurrentRolChipName = rol.name;
      }
    }
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.removeUserToInitiative();
  //     }
  //     console.log('The dialog was closed');
  //   });
  // }

  dialogConfirm(){
    this._interactions.confirmationModal((decision)=>{
    if (decision) {
        console.log('%cRemove','background: #222; color: #fd8484');
        this.removeUserToInitiative();
      }else{
        console.log("%cDon't remove",'background: #222; color: #37ff73');
      }
    });
  }




  validateExpand(){
    return this._interactions.disableAllExpandBool?(this._interactions.currentUserIdOnlyExpand!=this.user.userId):false;
  }

  printSome(){
    if (this.validateExpand()) {
      this._interactions.openSnackBar("You have pending changes, please update or cancel the user's info","Ok");
      this._interactions.animateButtonSave = false;
      setTimeout(() => {
        this._interactions.animateButtonSave = true;

      }, 100);

    }

  }

  cancelAction(){
    this.reload.emit();
    this._interactions.disableAllExpandBool = false;
  }

}
