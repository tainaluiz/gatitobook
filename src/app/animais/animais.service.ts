import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Animais, Animal } from './animal';

const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private readonly _http: HttpClient) {}

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this._http.get<Animais>(
      `${environment.apiURL}/${nomeUsuario}/photos`
    );
  }

  buscaPorId(id: number): Observable<Animal> {
    return this._http.get<Animal>(`${environment.apiURL}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this._http.delete<Animal>(`${environment.apiURL}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return this._http
      .post(
        `${environment.apiURL}/photos/${id}/like`,
        {},
        { observe: 'response' }
      )
      .pipe(
        mapTo(true),
        catchError((error) => {
          return error.status === NOT_MODIFIED ? of(false) : throwError(error);
        })
      );
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', String(permiteComentario ?? false));
    formData.append('imageFile', arquivo);

    return this._http.post(`${environment.apiURL}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
