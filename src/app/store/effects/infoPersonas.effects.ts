import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ClientesModel } from "src/app/models/clientes.model";
import { ResponseModel } from "src/app/models/response.model";
import { InfoPersonalService } from "src/app/services/info-personal.service";
import * as personasActions from "../actions/infoPersonas.actions";

@Injectable()
export class InfoPersonasEffects {
    
    constructor(
        private actions$: Actions,
        private info: InfoPersonalService
    ){}

    getInfoPersonas$ = createEffect(
        (): any => this.actions$.pipe(
            ofType( personasActions.getInfoPersonas ),            
            mergeMap(
                () => this.info.getAll()
                    .pipe(
                        map(result => personasActions.getInfoPersonasSuccess(
                            {
                                infoPersonas: result
                            }
                        )),
                        catchError(err => of(personasActions.getInfoPersonasError({
                            payload: err
                        })))
                    )
            )
        )
    );
}