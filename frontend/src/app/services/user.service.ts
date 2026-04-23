import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User, ApiResponse } from '@app/models';

/**
 * Servicio de Usuarios
 * 
 * Maneja operaciones CRUD de usuarios (solo admin).
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los usuarios (solo admin)
   *
   * @returns Observable con lista de usuarios
   */
  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl);
  }

  /**
   * Obtener usuario por ID (solo admin)
   *
   * @param id ID del usuario
   * @returns Observable con datos del usuario
   */
  getById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener perfil del usuario autenticado
   *
   * @returns Observable con perfil del usuario
   */
  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/profile`);
  }

  /**
   * Actualizar perfil del usuario autenticado
   *
   * @param user Datos actualizados
   * @returns Observable con perfil actualizado
   */
  updateProfile(user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/profile`, user);
  }

  /**
   * Crear nuevo usuario (solo admin)
   *
   * @param user Datos del usuario
   * @returns Observable con usuario creado
   */
  create(user: Partial<User> & { password: string }): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user);
  }

  /**
   * Actualizar usuario (solo admin)
   *
   * @param id ID del usuario
   * @param user Datos actualizados
   * @returns Observable con usuario actualizado
   */
  update(id: number, user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Cambiar rol de usuario (solo admin)
   *
   * @param id ID del usuario
   * @param role Nuevo rol
   * @returns Observable con usuario actualizado
   */
  changeRole(id: number, role: 'admin' | 'user'): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}/role`, { role });
  }

  /**
   * Eliminar usuario (solo admin)
   *
   * @param id ID del usuario
   * @returns Observable con respuesta
   */
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
