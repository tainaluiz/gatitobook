import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly _token = 'token';

  public retornaToken(): string {
    return localStorage.getItem(this._token) || '';
  }

  public salvaToken(value: string): void {
    localStorage.setItem(this._token, value);
  }

  public excluiToken(): void {
    localStorage.removeItem(this._token);
  }

  public possuiToken(): boolean {
    return !!this.retornaToken();
  }
}
