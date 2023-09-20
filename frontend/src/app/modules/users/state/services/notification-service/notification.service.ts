import { Injectable } from '@angular/core';

// sweet alert
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor() {}

    public displayNotification(): void {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Unsuccess!',
            text: 'Incorrect password',
            icon: 'error',
        });
    }
}
