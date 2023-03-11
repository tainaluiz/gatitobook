import { switchMap, tap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comentarios } from './comentario';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;

  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private readonly _comentariosService: ComentariosService,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comentarios$ = this._comentariosService.buscaComentario(this.id);
    this.comentarioForm = this._formBuilder.group({
      comentario: ['', Validators.maxLength(300)],
    });
  }

  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this._comentariosService
      .incluiComentario(this.id, comentario)
      .pipe(
        switchMap(() => this._comentariosService.buscaComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset();
          alert('Comentário salvo');
        })
      );
  }
}
