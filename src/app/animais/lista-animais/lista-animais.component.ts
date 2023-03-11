import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Animais } from './../animal';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  public animais!: Animais;

  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(() => {
      this.animais = this._activatedRoute.snapshot.data['animais'];
    });
  }
}
