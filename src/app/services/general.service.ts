import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private messageService: MessageService) { }

    showSuccess(message: string) {
        this.messageService.add({severity:'success', summary: 'Bien hecho', detail: message});
    }

    showError(message: string) {
        this.messageService.add({severity:'error', summary: 'Algo no va bien', detail: message});
    }

    showWarning(message: string) {
        this.messageService.add({severity:'warning', summary: 'Vaya', detail: message});
    }  
}
