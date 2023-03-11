import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './../../autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario = '';
  public senha = '';

  constructor(
    private readonly _authService: AutenticacaoService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this._authService.autenticar(this.usuario, this.senha).subscribe(
      () => void this._router.navigate(['animais']),
      (error) => console.error(error)
    );
  }
}
