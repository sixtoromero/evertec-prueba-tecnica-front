import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosModel } from '../../models/clientes.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: AuthService,
  ) {}

  ngOnInit(): void {    
    this.registroForm = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],      
      Correo: ['', [Validators.required, Validators.email]],
      Usuario: ['', Validators.required],
      Contrasena: ['', Validators.required],
    });
  }

  crearUsuario(){
    //this.ngxService.start();
    const model = this.prepareSave();    
    model.Id = 0;


  }

  private prepareSave(): ProjectModel {
    return new UsuariosModel().deserialize(this.registroForm.value);
  }

}
