import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  showCustomss(obj: {}): void {
    Swal.fire(obj);
  }
  showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }
}
