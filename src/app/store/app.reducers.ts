import { ActionReducerMap } from '@ngrx/store';
import * as  reducers from './reducers';


export interface AppState {
   personas:  reducers.InfoPersonasState
}

export const appReducers: ActionReducerMap<AppState> = {
   personas: reducers.personasReducer,
}