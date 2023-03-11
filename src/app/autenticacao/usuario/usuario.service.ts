import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  public usuario$ = this._usuarioSubject.asObservable();

  constructor(private readonly _tokenService: TokenService) {
    if (this._tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT(): void {
    const token = this._tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this._usuarioSubject.next(usuario);
  }

  public salvaToken(token: string): void {
    this._tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  public logout(): void {
    this._tokenService.excluiToken();
    this._usuarioSubject.next(null);
  }

  public estaLogado(): boolean {
    return this._tokenService.possuiToken();
  }
}
