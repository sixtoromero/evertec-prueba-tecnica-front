import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { ClientesModel } from '../models/clientes.model';

const httpOptions = {
  headers: new HttpHeaders({
      'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InfoPersonalService {

  endPoint = `${environment.apiURL}/Clientes`;

  constructor(private _http: HttpClient) { }

  insert(model: ClientesModel): Observable<ResponseModel<boolean>> {
    return this._http.post<ResponseModel<boolean>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
  }

  update(model: ClientesModel): Observable<ResponseModel<boolean>> {
    return this._http.put<ResponseModel<boolean>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
  }

  getClienteById(Id: number): Observable<ResponseModel<ClientesModel>> {
    return this._http.get<ResponseModel<ClientesModel>>(`${this.endPoint}/GetAsync/${Id}`);
  }

  getAll(): Observable<ResponseModel<ClientesModel[]>> {
    return this._http.get<ResponseModel<ClientesModel[]>>(`${this.endPoint}/GetAllAsync` );
  }
  
}