import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _usuarioService: UsuarioService
  ) {}

  public autenticar(
    userName: string,
    password: string
  ): Observable<HttpResponse<any>> {
    return this._httpClient
      .post(
        `${environment.apiURL}/user/login`,
        {
          userName,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          const authToken = response?.headers.get('x-access-token') ?? '';
          this._usuarioService.salvaToken(authToken);
        })
      );
  }
}
