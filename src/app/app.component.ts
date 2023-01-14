import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {ButtonModule} from 'primeng/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'evertecapp';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }



}
