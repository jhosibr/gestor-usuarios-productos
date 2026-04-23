import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '@app/models';

/**
 * Servicio de Carrito de Compras
 * 
 * Maneja el estado del carrito con reactividad en tiempo real.
 * Utiliza Signals de Angular 21 para actualizaciones instantáneas.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSignal = signal<CartItem[]>(this.loadCartFromStorage());

  // Computed signals para cálculos en tiempo real
  public items = computed(() => this.cartSignal());
  public itemCount = computed(() => 
    this.cartSignal().reduce((total, item) => total + item.quantity, 0)
  );
  public total = computed(() => 
    this.cartSignal().reduce((sum, item) => sum + item.subtotal, 0)
  );

  constructor() {}

  /**
   * Añadir producto al carrito
   *
   * @param product Producto a añadir
   * @param quantity Cantidad
   * 
   * @author Prueba Técnica
   * @since 2024/04
   */
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSignal();
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      // Actualizar cantidad si el producto ya existe
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * existingItem.product.price;
    } else {
      // Agregar nuevo producto
      currentCart.push({
        product,
        quantity,
        subtotal: quantity * product.price
      });
    }

    this.cartSignal.set([...currentCart]);
    this.saveCartToStorage();
  }

  /**
   * Eliminar producto del carrito
   *
   * @param productId ID del producto
   */
  removeFromCart(productId: number): void {
    const currentCart = this.cartSignal();
    const filtered = currentCart.filter(item => item.product.id !== productId);
    this.cartSignal.set(filtered);
    this.saveCartToStorage();
  }

  /**
   * Actualizar cantidad de un producto en el carrito
   *
   * @param productId ID del producto
   * @param quantity Nueva cantidad
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartSignal();
    const item = currentCart.find(item => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      item.subtotal = quantity * item.product.price;
      this.cartSignal.set([...currentCart]);
      this.saveCartToStorage();
    }
  }

  /**
   * Vaciar carrito
   */
  clearCart(): void {
    this.cartSignal.set([]);
    localStorage.removeItem('cart');
  }

  /**
   * Obtener item del carrito
   *
   * @param productId ID del producto
   * @returns Item del carrito o undefined
   */
  getCartItem(productId: number): CartItem | undefined {
    return this.cartSignal().find(item => item.product.id === productId);
  }

  /**
   * Verificar si un producto está en el carrito
   *
   * @param productId ID del producto
   * @returns true si está en el carrito
   */
  isInCart(productId: number): boolean {
    return !!this.cartSignal().find(item => item.product.id === productId);
  }

  /**
   * Guardar carrito en almacenamiento local
   */
  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartSignal()));
  }

  /**
   * Cargar carrito desde almacenamiento local
   *
   * @returns Items del carrito
   */
  private loadCartFromStorage(): CartItem[] {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
  }
}
