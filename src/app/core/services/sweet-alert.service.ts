import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  success(title: string, subtitle?: string) {
    return Swal.fire({
      title: title,
      text: subtitle,
      icon: 'success',
    });
  }
  
  warning(title: string, subtitle?: string) {
    return Swal.fire({
      title: title,
      text: subtitle,
      icon: 'warning',
    });
  }
  
  error(title: string, subtitle?: string) {
    return Swal.fire({
      title: title,
      text: subtitle,
      icon: 'error',
    });
  }

  confirm(title: string, subtitle?: string, confirmButtonText: string = "Confirmar") {
    return Swal.fire({
      title: title,
      text: subtitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText
    });
  }

}
