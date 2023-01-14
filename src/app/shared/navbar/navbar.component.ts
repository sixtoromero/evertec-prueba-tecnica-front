import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  
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

}
