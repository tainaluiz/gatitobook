import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimaisService } from './../animais.service';
import { Animal } from './../animal';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private readonly _animaisService: AnimaisService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.animalId = this._activatedRoute.snapshot.params.animalId;
    this.animal$ = this._animaisService.buscaPorId(this.animalId);
  }

  curtir(): void {
    this._animaisService.curtir(this.animalId).subscribe((curtida) => {
      if (curtida) {
        this.animal$ = this._animaisService.buscaPorId(this.animalId);
      }
    });
  }

  excluir(): void {
    this._animaisService.excluiAnimal(this.animalId).subscribe(
      () => {
        this._router.navigate(['/animais/']);
      },
      (error) => console.log(error)
    );
  }
}
