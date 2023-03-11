import { AbstractControl } from '@angular/forms';

export function minusculoValidator(control: AbstractControl) {
  const valor: string = control.value;

  return valor && valor !== valor.toLowerCase() ? { minusculo: true } : null;
}
