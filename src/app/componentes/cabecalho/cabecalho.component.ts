import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {
  public user$ = this._usuarioService.usuario$;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._usuarioService.logout();
    this._router.navigate(['']);
  }
}
