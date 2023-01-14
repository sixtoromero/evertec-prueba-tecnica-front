import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosModel } from '../../models/clientes.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [GeneralService, MessageService, ConfirmationService]
})
export class RegisterComponent implements OnInit {
  
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,    
    private usuarioService: AuthService,    
    private ngxService: NgxUiLoaderService,
    private general: GeneralService,
  ) {}

  ngOnInit(): void {    
    this.registroForm = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],      
      Correo: ['', [Validators.required, Validators.email]],      
      Contrasena: ['', Validators.required],
    });
  }

  crearUsuario(){    
    this.ngxService.start();
    let model = this.prepareSave();    
    model.Id = 0;
    
    this.usuarioService.insert(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){                
        //Cargar registros guardados
        this.general.showSuccess('registrado exitosamente');
        this.registroForm.reset();
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.ngxService.stop();
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  private prepareSave(): UsuariosModel {
    return new UsuariosModel().deserialize(this.registroForm.value);
  }

}
