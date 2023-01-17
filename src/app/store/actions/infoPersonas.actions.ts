import { createAction, props } from '@ngrx/store';
import { ClientesModel } from 'src/app/models/clientes.model';
import { ResponseModel } from 'src/app/models/response.model';

export const getInfoPersonas = createAction('[InfoPersonas] Cargar InfoPersonas');

export const getInfoPersonasSuccess = createAction(
    '[InfoPersonas] Cargar InfoPersonas Success',
    props<{ infoPersonas: ResponseModel<ClientesModel[]> }>()
);

export const getInfoPersonasError = createAction(
    '[InfoPersonas] Cargar InfoPersonas Error',
    props<{ payload: any[] }>()
);

