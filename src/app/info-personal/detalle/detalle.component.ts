import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientesModel } from 'src/app/models/clientes.model';
import { InfoPersonalService } from 'src/app/services/info-personal.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModInfoPersonComponent } from '../mod-info-person/mod-info-person.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [GeneralService, MessageService, ConfirmationService, DialogService]
})
export class DetalleComponent implements OnDestroy {

  infoPersonal: ClientesModel[] = [];
  ref!: DynamicDialogRef;

  infoPerson!: ClientesModel;

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
    if (this.ref) {
        this.ref.close();
    }
  }

  getInfoPersonaById(Id: number){
    this.ngxService.start();
    this.info.getClienteById(Id)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log('Respuesta', response);
      if (response["IsSuccess"]) {
        this.infoPerson = response["Data"] as ClientesModel;
        
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

}