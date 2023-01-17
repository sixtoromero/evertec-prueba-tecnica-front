import { Action, createReducer, on, State } from '@ngrx/store';
import { ClientesModel } from 'src/app/models/clientes.model';
import { ResponseModel } from 'src/app/models/response.model';
import { getInfoPersonas, getInfoPersonasError, getInfoPersonasSuccess } from '../actions';


export interface InfoPersonasState {
    personas : ResponseModel<ClientesModel[]>,
    loaded  : boolean,
    loading: boolean,
    error   : any
}

export const PersonsinitialState: InfoPersonasState = {
    personas : {IsSuccess: false, Data: [], Message: ''},
    loaded  : false,
    loading: false,
    error   : false
}

const _personasReducer = createReducer(PersonsinitialState,

    on(getInfoPersonas, state => ({ ...state, loading: true})),
    on(getInfoPersonasSuccess, (state, { infoPersonas }) => ({
        ...state,
        loading: false,
        loaded: true,
        personas: infoPersonas //[ ...InfoPersonas ]
    })),
    on(getInfoPersonasError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
);

export function personasReducer(state: InfoPersonasState | undefined, action: Action) {
    return _personasReducer(state, action);
}