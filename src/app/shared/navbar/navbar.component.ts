import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NavbarComponent implements OnInit  {
  
  constructor(    
    private router: Router,
    private confirmationService: ConfirmationService
  ){}

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
        {
            label: 'Info Personal',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/info-persona']
        },
        {
            label: 'Detalle',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/detalle']
        }
    ];
 }

 openInfoPerson(){
    console.log('HOLA');
 }

 cerrarSesion(){

  this.confirmationService.confirm({
    message: 'desea cerrar la sesión?',
    accept: () => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  });  
 }

}
