import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { environment } from '@environments/environment';
import { User, AuthResponse, LoginCredentials, RegisterData, ApiResponse } from '@app/models';

/**
 * Servicio de Autenticación
 * 
 * Maneja login, registro, logout y estado de autenticación.
 * Utiliza Signals de Angular 21 para reactividad.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  // Signals para estado reactivo
  private userSignal = signal<User | null>(this.loadUserFromStorage());
  private tokenSignal = signal<string | null>(this.loadTokenFromStorage());
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computed signals
  public isAuthenticated = computed(() => !!this.tokenSignal() && !!this.userSignal());
  public currentUser = computed(() => this.userSignal());
  public isAdmin = computed(() => this.userSignal()?.role === 'admin');
  public loading = computed(() => this.loadingSignal());
  public error = computed(() => this.errorSignal());

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  /**
   * Inicializar autenticación desde almacenamiento local
   * 
   * @author Prueba Técnica
   * @since 2024/04
   */
  private initializeAuth(): void {
    const token = this.loadTokenFromStorage();
    const user = this.loadUserFromStorage();

    if (token && user) {
      this.tokenSignal.set(token);
      this.userSignal.set(user);
    }
  }

  /**
   * Registrar nuevo usuario
   *
   * @param data Datos de registro
   * @returns Observable con respuesta de autenticación
   */
  register(data: RegisterData): Observable<ApiResponse<AuthResponse>> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, data)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setAuth(response.data);
          }
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          const errorMessage = error.error?.message || 'Error en el registro';
          this.errorSignal.set(errorMessage);
          this.loadingSignal.set(false);
          throw error;
        })
      );
  }

  /**
   * Iniciar sesión
   *
   * @param credentials Credenciales de login
   * @returns Observable con respuesta de autenticación
   */
  login(credentials: LoginCredentials): Observable<ApiResponse<AuthResponse>> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setAuth(response.data);
          }
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          const errorMessage = error.error?.message || 'Error en la autenticación';
          this.errorSignal.set(errorMessage);
          this.loadingSignal.set(false);
          throw error;
        })
      );
  }

  /**
   * Cerrar sesión
   *
   * @returns Observable con respuesta
   */
  logout(): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearAuth();
        }),
        catchError(error => {
          this.clearAuth();
          return of({ success: true });
        })
      );
  }

  /**
   * Obtener usuario actual desde el servidor
   *
   * @returns Observable con datos del usuario
   */
  getCurrentUser(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.userSignal.set(response.data);
            this.saveUserToStorage(response.data);
          }
        }),
        catchError(error => {
          this.clearAuth();
          throw error;
        })
      );
  }

  /**
   * Establecer datos de autenticación
   *
   * @param authResponse Respuesta de autenticación
   */
  private setAuth(authResponse: AuthResponse): void {
    this.tokenSignal.set(authResponse.token);
    this.userSignal.set(authResponse.user);

    this.saveTokenToStorage(authResponse.token);
    this.saveUserToStorage(authResponse.user);
  }

  /**
   * Limpiar datos de autenticación
   */
  private clearAuth(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.errorSignal.set(null);

    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.userKey);
  }

  /**
   * Obtener token actual
   *
   * @returns Token JWT
   */
  getToken(): string | null {
    return this.tokenSignal();
  }

  /**
   * Guardar token en almacenamiento local
   *
   * @param token Token JWT
   */
  private saveTokenToStorage(token: string): void {
    localStorage.setItem(environment.tokenKey, token);
  }

  /**
   * Cargar token desde almacenamiento local
   *
   * @returns Token JWT o null
   */
  private loadTokenFromStorage(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  /**
   * Guardar usuario en almacenamiento local
   *
   * @param user Usuario
   */
  private saveUserToStorage(user: User): void {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
  }

  /**
   * Cargar usuario desde almacenamiento local
   *
   * @returns Usuario o null
   */
  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem(environment.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }
}
