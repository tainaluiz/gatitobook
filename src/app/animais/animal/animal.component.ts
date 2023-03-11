import { Component, Input, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  @Input() public descricao = '';

  @Input() public set url(url: string) {
    this._urlOriginal = url.startsWith('data')
      ? url
      : `${environment.apiURL}/imgs/${url}`;
  }

  public get url(): string {
    return this._urlOriginal;
  }

  private _urlOriginal = '';

  constructor() {}

  ngOnInit(): void {}
}
