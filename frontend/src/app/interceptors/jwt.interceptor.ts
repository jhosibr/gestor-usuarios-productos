import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

/**
 * Interceptor JWT
 * 
 * Incluye automáticamente el token JWT en todas las solicitudes HTTP.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Interceptar solicitud HTTP
   *
   * @param req Solicitud HTTP
   * @param next Handler siguiente
   * @returns Observable con evento HTTP
   * 
   * @author Prueba Técnica
   * @since 2024/04
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      // Clonar la solicitud y agregar header de autorización
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
