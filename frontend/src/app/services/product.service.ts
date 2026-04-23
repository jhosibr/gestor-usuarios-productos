import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Product, ApiResponse } from '@app/models';

/**
 * Servicio de Productos
 * 
 * Maneja operaciones CRUD de productos.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los productos
   *
   * @returns Observable con lista de productos
   */
  getAll(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl);
  }

  /**
   * Obtener producto por ID
   *
   * @param id ID del producto
   * @returns Observable con datos del producto
   */
  getById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Buscar productos
   *
   * @param query Término de búsqueda
   * @returns Observable con productos encontrados
   */
  search(query: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/search`, {
      params: { q: query }
    });
  }

  /**
   * Obtener productos por categoría
   *
   * @param category Categoría
   * @returns Observable con productos de la categoría
   */
  getByCategory(category: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/category/${category}`);
  }

  /**
   * Crear nuevo producto (solo admin)
   *
   * @param product Datos del producto
   * @returns Observable con producto creado
   */
  create(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, product);
  }

  /**
   * Actualizar producto (solo admin)
   *
   * @param id ID del producto
   * @param product Datos actualizados
   * @returns Observable con producto actualizado
   */
  update(id: number, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${id}`, product);
  }

  /**
   * Eliminar producto (solo admin)
   *
   * @param id ID del producto
   * @returns Observable con respuesta
   */
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
