import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { AnimaisService } from './../animais.service';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css'],
})
export class NovoAnimalComponent implements OnInit {
  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(
    private readonly _animaisService: AnimaisService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.formularioAnimal = this._formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload(): void {
    const allowComments =
      this.formularioAnimal.get('allowComments')?.value ?? false;
    const description = this.formularioAnimal.get('description')?.value ?? '';

    this._animaisService
      .upload(description, allowComments, this.file)
      .pipe(
        filter((event) => event?.type === HttpEventType.UploadProgress),
        finalize(() => this._router.navigate(['animais']))
      )
      .subscribe(
        (event: any) => {
          const total = event.total ?? 1;
          this.percentualConcluido = Math.round(100 * (event.loaded / total));
        },
        (error) => console.log(error)
      );
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
