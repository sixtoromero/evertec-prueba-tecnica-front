import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { ClientesModel } from '../models/clientes.model';

const httpOptions = {
  headers: new HttpHeaders({
      'Contend-Type': 'multipart/form-data',
      'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InfoPersonalService {

  endPoint = `${environment.apiURL}/Clientes`;

  constructor(private _http: HttpClient) { }  

  insert(formData: FormData): Observable<ResponseModel<boolean>> {    
    return this._http.post<ResponseModel<boolean>>(`${this.endPoint}/InsertAsync`, formData, httpOptions);
  }

  update(formData: FormData): Observable<ResponseModel<boolean>> {
    return this._http.put<ResponseModel<boolean>>(`${this.endPoint}/UpdateAsync`, formData, httpOptions);
  }

  delete(Id: number, fileName: string): Observable<ResponseModel<string>> {
    return this._http.delete<ResponseModel<string>>(`${this.endPoint}/DelAsync?Id=${Id}&fileName=${fileName}`, httpOptions);
  }

  getClienteById(Id: number): Observable<ResponseModel<ClientesModel>> {
    return this._http.get<ResponseModel<ClientesModel>>(`${this.endPoint}/GetAsync?ID=${Id}`);
  }

  getAllSimple(){
    return this._http.get(`${this.endPoint}/GetAllAsync`)
      .pipe(
        map(resp => resp)
      );
  }

  getAll(): Observable<ResponseModel<ClientesModel[]>> {
    return this._http.get<ResponseModel<ClientesModel[]>>(`${this.endPoint}/GetAllAsync` );
  }

}
