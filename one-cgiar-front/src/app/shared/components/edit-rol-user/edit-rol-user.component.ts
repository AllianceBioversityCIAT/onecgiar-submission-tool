import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitiativesService } from '@app/shared/services/initiatives.service';

@Component({
  selector: 'app-edit-rol-user',
  templateUrl: './edit-rol-user.component.html',
  styleUrls: ['./edit-rol-user.component.scss']
})
export class EditRolUserComponent implements OnInit {
  @Input() user:any;
  @Input() roles;
  @Output() reload = new EventEmitter();
  activeExpansion=false;
  CurrentRolChipName;
  public userRolForm: FormGroup;
  constructor(
    public _initiativesService:InitiativesService,
  ) { 
    this.userRolForm = new FormGroup({
      userId: new FormControl(''),
      roleId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.user.roleId) {
      this.userRolForm.controls.roleId.setValue(this.user.roleId);
      this.getLocalRolById(this.user.roleId);
    }
    this.userRolForm.controls.userId.setValue(this.user.userId);
    this.userRolForm.valueChanges.subscribe(resp=>{
      this.getLocalRolById(resp.roleId);
    })
    
  }

  removeUserToInitiative(){
    this.activeExpansion = true;
    console.log("function()");
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
  }

  assignUserToInitiative(){
    console.log("assignUserToInitiative");
    console.log(this.user);
    this.userRolForm.controls.userId.setValue(this.user.userId);
    console.log(this.userRolForm.value);
    let body =  this.userRolForm.value;
    body.active = true;
    this._initiativesService.assignUserToInitiative(body,this._initiativesService.initvStgId).subscribe(resp=>{
      console.log(resp);
      this.reload.emit();
    });
  }

  getLocalRolById(id){
    for (const rol of this.roles) {
      if (rol.id == id) {
        this.CurrentRolChipName = rol.name;
      }
    }
  }

}
