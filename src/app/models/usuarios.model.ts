import { Deserializable } from './deserializable.model';

export class UsuariosModel implements Deserializable  {    
    public Id!: number;
    public Nombres!: string;
    public Apellidos!: string;
    public Correo!: string;
    //public Usuario!: string;
    public Contrasena!: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}