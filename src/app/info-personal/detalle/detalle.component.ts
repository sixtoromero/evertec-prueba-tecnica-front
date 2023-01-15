import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientesModel } from 'src/app/models/clientes.model';
import { InfoPersonalService } from 'src/app/services/info-personal.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [GeneralService, MessageService, ConfirmationService]
})
export class DetalleComponent {

  infoPersonal: ClientesModel[] = [];

  constructor(    
    private info: InfoPersonalService,
    private ngxService: NgxUiLoaderService,
    private general: GeneralService,    
  ){
    this.getAllInfoPersonal();
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

}