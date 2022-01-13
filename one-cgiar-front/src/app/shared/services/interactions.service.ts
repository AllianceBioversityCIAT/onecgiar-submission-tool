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

  successMessage(title:string,seconds?:number){
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: seconds?seconds:3000
    })
  }

  warningMessage(title:string,seconds?:number){
    Swal.fire({
      icon: 'warning',
      title: title,
      showConfirmButton: false,
      timer: seconds?seconds:3000
    })
  }


  errorMessage(title:string,seconds?:number){
    Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: seconds?seconds:3000
    })
  }

  confirmationModal(callback:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#eb4444',
      cancelButtonColor: '#37474F',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
      backdrop: '#020d11a1'
    }).then((result) => {
      callback(result.isConfirmed);
    })
  }
  
  currentUserIdOnlyExpand=-1;
  disableAllExpandBool=false;
  disableOthersExpand(userId:any){
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
      duration:6000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['marginSnackTop']
    });
  }

  openSnackBarPosition(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration:4000,
      horizontalPosition:'left',
      verticalPosition:'bottom',
      panelClass: ['marginSnackTop']
    });
  }

}
