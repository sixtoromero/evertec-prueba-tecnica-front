import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GeneralModel } from '../models/general.model';
import { InfoPersonalService } from '../services/info-personal.service';
import { ClientesModel } from '../models/clientes.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.scss'],
  providers: [GeneralService, MessageService, ConfirmationService]
})
export class InfoPersonalComponent {
  
  infoPersonForm!: FormGroup;
  files: any = [];  
  imageData: string = '';
  nameImage: string = '';
  sizeImage: string = '';

  estadoCivil: GeneralModel[] = [];
  tieneHermano: GeneralModel[] = [];

  constructor(
    private fb: FormBuilder,        
    private info: InfoPersonalService,
    private ngxService: NgxUiLoaderService,
    private general: GeneralService,
    private sanitizer: DomSanitizer
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
    this.ngxService.start();
    let model = this.prepareSave();    
    model.Id = 0;        

    this.info.insert(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){                
        //Cargar registros guardados
        this.general.showSuccess('registrado exitosamente');
        this.infoPersonForm.reset();
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.ngxService.stop();
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }  

  getFile(event: any): any {
    const file = event.target.files[0];
    
    this.nameImage = file['name'];
    //this.sizeImage = file['size'];

    const byteSize = require('byte-size');

    this.sizeImage = byteSize(parseInt(file['size']));

    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;      
    };
    reader.readAsDataURL(file);        
  }

  private prepareSave(): ClientesModel {
    return new ClientesModel().deserialize(this.infoPersonForm.value);
  }

}
