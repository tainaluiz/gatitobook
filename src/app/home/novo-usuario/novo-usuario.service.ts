import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { NovoUsuario } from './novo-usuario.model';

@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  constructor(private readonly _httpClient: HttpClient) {}

  public cadastraNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this._httpClient.post(
      `${environment.apiURL}/user/signup`,
      novoUsuario
    );
  }

  public verificaUsuarioExistente(nomeUsuario: string): Observable<boolean> {
    return this._httpClient.get<boolean>(
      `${environment.apiURL}/user/exists/${nomeUsuario}`
    );
  }
}
