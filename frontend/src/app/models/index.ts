/**
 * Modelos e Interfaces de la Aplicación
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */

/**
 * Interfaz de Usuario
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at?: string;
  updated_at?: string;
}

/**
 * Interfaz de Producto
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interfaz de Compra
 */
export interface Purchase {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
  user?: User;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interfaz de Item del Carrito
 */
export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

/**
 * Interfaz de Respuesta de API
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

/**
 * Interfaz de Respuesta de Autenticación
 */
export interface AuthResponse {
  user: User;
  token: string;
  role?: string;
}

/**
 * Interfaz de Credenciales de Login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interfaz de Datos de Registro
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * Interfaz de Estado de Autenticación
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Interfaz de Estado del Carrito
 */
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
