import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosModel } from '../models/clientes.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
      'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint = `${environment.apiURL}/Usuarios`;
  
  constructor(private _http: HttpClient) { }

  insert(model: UsuariosModel): Observable<Observable<ResponseModel<boolean>>> {
    return this._http.post<Observable<ResponseModel<boolean>>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
  }

  update(model: UsuariosModel): Observable<Observable<ResponseModel<boolean>>> {
    return this._http.put<Observable<ResponseModel<boolean>>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
  }

  getUserByUserName(model: UsuariosModel): Observable<Observable<ResponseModel<UsuariosModel>>> {        
    return this._http.post<Observable<ResponseModel<UsuariosModel>>>(`${this.endPoint}/GetUserByUserName`, model, httpOptions );
  }

  

}
