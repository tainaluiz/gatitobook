import { Router } from '@angular/router';
import { UsuarioExisteService } from './usuario-existe.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario.model';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  public novoUsuarioForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _novoUsuarioService: NovoUsuarioService,
    private readonly _usuarioExisteService: UsuarioExisteService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          [Validators.required, minusculoValidator],
          [this._usuarioExisteService.usuarioJaExiste()],
        ],
        password: ['', [Validators.required]],
      },
      {
        validators: [usuarioSenhaIguaisValidator],
      }
    );
  }

  cadastrar(): void {
    if (this.novoUsuarioForm.invalid) {
      return;
    }

    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    this._novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
      () => {
        this._router.navigate(['']);
      },
      (error) => console.error(error)
    );
  }

  getField(name: string): AbstractControl | null {
    return this.novoUsuarioForm.get(name);
  }

  fieldHasError(fieldName: string, error: string): boolean {
    const errors = this.getField(fieldName)?.errors;
    return errors && errors[error] ? true : false;
  }
}
