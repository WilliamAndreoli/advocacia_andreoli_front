import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Verificar se o usuário está autenticado (exemplo: verificar token no localStorage)
  const isAuthenticated = sessionStorage.getItem('auth-token');

  if (!isAuthenticated) {
    // Redirecionar para /login se não autenticado
    router.navigate(['/login']);
    return false;
  }

  return true;
};
