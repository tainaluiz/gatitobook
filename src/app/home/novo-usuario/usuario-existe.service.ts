import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private _novoUsuarioService: NovoUsuarioService) {}

  public usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) =>
          iif(
            () => control.errors === null,
            this._novoUsuarioService.verificaUsuarioExistente(value),
            of(false)
          )
        ),
        map((existe: boolean) => (existe ? { usuarioExistente: true } : null)),
        first()
      );
    };
  }
}
