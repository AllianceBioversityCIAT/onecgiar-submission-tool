import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  collapseHeader = false;
  showHeader = true;
  noWp = false;
  requests=[];
  expandWithUserId = -1;
  animateButtonSave = false;
  constructor(
    private _snackBar: MatSnackBar
  ) { }

  successMessage(title:string){
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

  errorMessage(title:string){
    Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }
  
  currentUserIdOnlyExpand=-1;
  disableAllExpandBool=false;
  disableOthersExpand(userId){
    // console.log(sl+" "+this.user.first_name);
    console.log("helloo "+ userId);
    this.disableAllExpandBool=true;
    this.currentUserIdOnlyExpand = userId;
  }

  enableAllExpand(){
    this.disableAllExpandBool=false;
    // console.log(sl+" "+this.user.first_name);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['marginSnackTop']
    });
  }

}
