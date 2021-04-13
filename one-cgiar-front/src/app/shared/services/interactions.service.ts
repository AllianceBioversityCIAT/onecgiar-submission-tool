import { Injectable } from '@angular/core';
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
  constructor() { }

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

}
