import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';
import { Comentario, Comentarios } from './comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(private readonly _httpClient: HttpClient) {}

  buscaComentario(id: number): Observable<Comentarios> {
    return this._httpClient.get<Comentarios>(this.getCommentsUrl(id));
  }

  incluiComentario(id: number, commentText: string): Observable<Comentario> {
    return this._httpClient.post<Comentario>(this.getCommentsUrl(id), {
      commentText,
    });
  }

  getCommentsUrl(id: number): string {
    return `${environment.apiURL}/photos/${id}/comments`;
  }
}
