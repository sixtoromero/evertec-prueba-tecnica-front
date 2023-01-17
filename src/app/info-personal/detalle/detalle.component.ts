import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientesModel } from 'src/app/models/clientes.model';
import { InfoPersonalService } from 'src/app/services/info-personal.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [GeneralService, MessageService, ConfirmationService, DialogService]
})
export class DetalleComponent implements OnDestroy {

  infoPersonal: ClientesModel[] = [];
  ref!: DynamicDialogRef;
  displayBasic!: boolean;
  files: any = [];
  imageData: string = '';
  nameImage: string = '';
  sizeImage: string = ''; 

  infoPerson = new ClientesModel();

  constructor(    
    private info: InfoPersonalService,
    private ngxService: NgxUiLoaderService,
    private general: GeneralService,    
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private router: Router
  ){
    this.getAllInfoPersonal();
  }

  ngOnDestroy() {
    
  }

  getInfoPersonaById(Id: number){
    this.ngxService.start();
    this.info.getClienteById(Id)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log('Respuesta', response);
      if (response["IsSuccess"]) {
        this.infoPerson = response["Data"] as ClientesModel;  
        this.infoPerson.Fecha_Nacimiento_formato = moment(this.infoPerson.Fecha_Nacimiento).format('MM-DD-YYYY');
        this.imageData = this.infoPerson.Foto;

        console.log('Info Perosnal Modal', this.infoPerson);
        this.displayBasic = true;
      }
    }, error => {
      this.ngxService.stop()
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }  

  getAllInfoPersonal() {
    this.ngxService.start();
    this.info.getAll()
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log('Respuesta', response);
      if (response["IsSuccess"]) {
        this.infoPersonal = response["Data"] as ClientesModel[];
        console.log('Info Perosnal', this.infoPersonal);        
      }
    }, error => {
      this.ngxService.stop()
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  onRowEditInit(Id: number){
    //this.router.navigate(['/info-persona', Id]);
    this.getInfoPersonaById(Id);
  }
  

  onRowDelete(Id: number, fileName: string){
    this.confirmationService.confirm({
      message: 'Realmente desea eliminar el registro seleccionado?',
      accept: () => {
        const path = fileName.split('/');
        this.ngxService.start();
        this.info.delete(Id, path[path.length - 1])
        .pipe(finalize(() => this.ngxService.stop()))
        .subscribe(response => {      
          console.log(response);
          if (response["IsSuccess"]) {        
            this.general.showSuccess("Se ha eliminado el registro correctamente.");
            this.getAllInfoPersonal();
          }
        }, error => {
          this.ngxService.stop();
          this.general.showError('Ha ocurrido un error inesperado.');          
        });
      }
    });
  }

  getFile(event: any): any {
    const file = event.target.files[0];
    this.files.push(file);
    
    this.nameImage = file['name'];    
    const byteSize = require('byte-size');
    this.sizeImage = byteSize(parseInt(file['size']));

    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;      
    };
    reader.readAsDataURL(file);
  }

  updateInfoPersona(){
    try {

      this.ngxService.start();
      const formData = new FormData();

      formData.append('File', this.files[0]);
      formData.append('jsonModel', JSON.stringify(this.infoPerson));

      this.info.update(formData)
      .pipe(finalize(() => this.ngxService.stop()))
      .subscribe(response => {
        if (response["IsSuccess"]){                
          //Cargar registros guardados
          
          this.general.showSuccess('registrado exitosamente');          
          this.imageData = '';
          this.files = [];
          this.displayBasic = false;

        } else {
          this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
        }
      }, error => {
        this.ngxService.stop();
        this.general.showError('Ha ocurrido un error inesperado.');
      });      
    } catch (error) {
      console.log('ERROR', error);
    } 
  }

}