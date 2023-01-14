import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GeneralModel } from '../models/general.model';


@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.scss'],
  providers: [GeneralService, MessageService, ConfirmationService]
})
export class InfoPersonalComponent {
  
  infoPersonForm!: FormGroup;
  myfile: any[] = [];
  estadoCivil: GeneralModel[] = [];
  tieneHermano: GeneralModel[] = [];

  constructor(
    private fb: FormBuilder,    
    private usuarioService: AuthService,    
    private ngxService: NgxUiLoaderService,
    private general: GeneralService,
  ) {

    this.estadoCivil = [
      {name: 'Soltero', code: 'false'},
      {name: 'Casado', code: 'true'}
    ];

    this.tieneHermano = [
      {name: 'No', code: 'false'},
      {name: 'Si', code: 'true'}
    ];
  }

  ngOnInit(): void { 

    this.infoPersonForm = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],      
      Fecha_Nacimiento: ['', Validators.required],      
      Foto: ['', Validators.required],
      Estado_Civil: ['', Validators.required],
      Tiene_Hermanos: ['', Validators.required]
    });
  }

  crearInfoPersonal(){

  }

  myUploader(event: any) {
    //event.files == files to upload
    console.log(event);
  }

}
