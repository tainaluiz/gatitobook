import { map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { AnimaisService } from '../animais.service';
import { Animais } from '../animal';

@Injectable({
  providedIn: 'root',
})
export class ListaAnimaisResolver implements Resolve<Animais> {
  constructor(
    private readonly _animaisService: AnimaisService,
    private readonly _usuarioService: UsuarioService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Animais> {
    return this._usuarioService.usuario$.pipe(
      map((usuario) => usuario?.name ?? ''),
      switchMap((nomeUsuario) =>
        this._animaisService.listaDoUsuario(nomeUsuario)
      ),
      take(1)
    );
  }
}
