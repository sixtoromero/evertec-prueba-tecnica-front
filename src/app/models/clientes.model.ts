import { Deserializable } from './deserializable.model';

export class ClientesModel implements Deserializable  {    
    public Id!: number;
    public Nombres!: string;
    public Apellidos!: string;
    public Fecha_Nacimiento!: Date;
    public Foto!: string;
    public Estado_Civil!: boolean;
    public Tiene_Hermanos!: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}