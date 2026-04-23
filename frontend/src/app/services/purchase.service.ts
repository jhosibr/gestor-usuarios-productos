import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Purchase, ApiResponse } from '@app/models';

/**
 * Servicio de Compras
 * 
 * Maneja compras de productos y consulta de historial.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = `${environment.apiUrl}/purchases`;

  constructor(private http: HttpClient) {}

  /**
   * Realizar una compra
   *
   * @param productId ID del producto
   * @param quantity Cantidad
   * @returns Observable con detalles de la compra
   */
  purchase(productId: number, quantity: number): Observable<ApiResponse<Purchase>> {
    return this.http.post<ApiResponse<Purchase>>(`${this.apiUrl}/purchase`, {
      product_id: productId,
      quantity
    });
  }

  /**
   * Obtener mis compras
   *
   * @returns Observable con historial de compras
   */
  getMyPurchases(): Observable<ApiResponse<Purchase[]>> {
    return this.http.get<ApiResponse<Purchase[]>>(`${this.apiUrl}/my-purchases`);
  }

  /**
   * Obtener todas las compras (solo admin)
   *
   * @returns Observable con todas las compras
   */
  getAll(): Observable<ApiResponse<Purchase[]>> {
    return this.http.get<ApiResponse<Purchase[]>>(this.apiUrl);
  }

  /**
   * Obtener detalles de una compra (solo admin)
   *
   * @param id ID de la compra
   * @returns Observable con detalles de la compra
   */
  getById(id: number): Observable<ApiResponse<Purchase>> {
    return this.http.get<ApiResponse<Purchase>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener estadísticas de compras (solo admin)
   *
   * @returns Observable con estadísticas
   */
  getStats(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/stats`);
  }
}
