import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { UsuariosModel } from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [GeneralService, MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,    
    private usuarioService: AuthService,    
    private ngxService: NgxUiLoaderService,
    private general: GeneralService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Contrasena: ['', Validators.required]
    });
  }

  login(){
    if (this.loginForm.invalid) {return;}
    this.ngxService.start();
    const model = this.prepareSave();    
    this.usuarioService.getUserByUserName(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log(response);
      if (response["IsSuccess"]){
        //Cargar registros guardados
        this.general.showSuccess('Ha iniciado sesión correctamente.');
        this.router.navigate(['/']);
      } else {
        this.general.showError(`Usuario o contraseña inconrrecto: ${response["Message"]}`);
      }
    }, error => {
      this.ngxService.stop();
      this.general.showError('Usuario o contraseña incorrecto.');
    });

  }

  private prepareSave(): UsuariosModel {
    return new UsuariosModel().deserialize(this.loginForm.value);
  }

}
