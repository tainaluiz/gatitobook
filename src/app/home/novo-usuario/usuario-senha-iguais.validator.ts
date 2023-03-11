import { FormGroup } from '@angular/forms';

export function usuarioSenhaIguaisValidator(form: FormGroup) {
  const { userName, password } = form.value;
  return (userName && userName.trim()) === (password && password.trim())
    ? { senhaIgualUsuario: true }
    : null;
}
