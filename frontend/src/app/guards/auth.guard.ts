import { Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

/**
 * Guard de Autenticación
 * 
 * Previene que usuarios no autenticados accedan a rutas protegidas.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = new AuthService(null as any);
  const router = new Router(null as any, null as any, null as any, null as any, null as any);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
