# Frontend SPA - Sistema de Gestión de Usuarios y Productos

## Descripción

Aplicación Single Page Application (SPA) desarrollada con **Angular 21** que proporciona una interfaz elegante y reactiva para gestionar usuarios, productos y compras.

## Características

- ✅ Autenticación con JWT
- ✅ Guards de rutas (AuthGuard, RoleGuard)
- ✅ Lazy Loading de módulos
- ✅ Signals de Angular 21 para reactividad
- ✅ Componentes con ChangeDetectionStrategy.OnPush
- ✅ Servicios centralizados con estado reactivo
- ✅ Interceptor JWT automático
- ✅ Validación de formularios reactivos
- ✅ Carrito de compras en tiempo real
- ✅ Interfaz elegante y responsiva
- ✅ Control de roles (Admin/User)

## Requisitos Previos

- Node.js 18+ y npm
- Angular CLI 21
- TypeScript 5.6+

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Editar `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  apiTimeout: 30000,
  tokenKey: 'auth_token',
  userKey: 'current_user',
};
```

### 3. Ejecutar la aplicación

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── modules/              # Módulos lazy-loaded
│   │   │   ├── auth/             # Módulo de autenticación
│   │   │   ├── admin/            # Módulo de administración
│   │   │   └── user/             # Módulo de usuario
│   │   ├── services/             # Servicios centralizados
│   │   │   ├── auth.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── purchase.service.ts
│   │   ├── guards/               # Guards de rutas
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── interceptors/         # Interceptores HTTP
│   │   │   └── jwt.interceptor.ts
│   │   ├── models/               # Interfaces TypeScript
│   │   ├── components/           # Componentes compartidos
│   │   └── pages/                # Páginas principales
│   ├── environments/             # Configuración de ambientes
│   ├── assets/                   # Recursos estáticos
│   ├── styles.scss               # Estilos globales
│   ├── main.ts                   # Punto de entrada
│   └── index.html                # HTML principal
├── angular.json                  # Configuración Angular
├── tsconfig.json                 # Configuración TypeScript
└── README.md                     # Este archivo
```

## Módulos

### Módulo de Autenticación (Público)

**Ruta**: `/auth`

Componentes:
- **Login**: Formulario de acceso
- **Register**: Formulario de registro

Características:
- Validación de contraseña segura
- Primer usuario recibe rol ADMIN automáticamente
- Redirección automática según rol

### Módulo de Administración (Privado - Solo Admin)

**Ruta**: `/admin`

Componentes:
- **Dashboard**: Panel principal
- **User Management**: CRUD de usuarios
- **Product Management**: CRUD de productos
- **Profile**: Perfil del administrador

Características:
- Gestión completa de usuarios
- Cambio de roles
- Gestión de productos
- Visualización de compras

### Módulo de Usuario (Privado - Rol USER)

**Ruta**: `/user`

Componentes:
- **Catalog**: Catálogo de productos
- **Cart**: Carrito de compras
- **Profile**: Perfil del usuario

Características:
- Catálogo con búsqueda y filtros
- Carrito con actualización en tiempo real
- Compra con validación de stock
- Historial de compras

## Servicios Principales

### AuthService

Maneja autenticación y estado del usuario.

```typescript
// Login
authService.login(credentials).subscribe(response => {
  console.log('Autenticado:', response.data.user);
});

// Registro
authService.register(data).subscribe(response => {
  console.log('Usuario registrado:', response.data.user);
});

// Verificar autenticación
if (authService.isAuthenticated()) {
  console.log('Usuario autenticado');
}

// Verificar rol admin
if (authService.isAdmin()) {
  console.log('Es administrador');
}
```

### CartService

Maneja el carrito de compras con reactividad en tiempo real.

```typescript
// Añadir al carrito
cartService.addToCart(product, quantity);

// Obtener items
const items = cartService.items();

// Obtener total
const total = cartService.total();

// Obtener cantidad de items
const count = cartService.itemCount();

// Eliminar del carrito
cartService.removeFromCart(productId);

// Actualizar cantidad
cartService.updateQuantity(productId, newQuantity);

// Vaciar carrito
cartService.clearCart();
```

### ProductService

Maneja operaciones con productos.

```typescript
// Obtener todos los productos
productService.getAll().subscribe(response => {
  const products = response.data;
});

// Buscar productos
productService.search('laptop').subscribe(response => {
  const results = response.data;
});

// Obtener por categoría
productService.getByCategory('Electrónica').subscribe(response => {
  const products = response.data;
});
```

### PurchaseService

Maneja compras y historial.

```typescript
// Realizar compra
purchaseService.purchase(productId, quantity).subscribe(response => {
  console.log('Compra realizada:', response.data);
});

// Obtener mis compras
purchaseService.getMyPurchases().subscribe(response => {
  const purchases = response.data;
});
```

## Guards de Rutas

### AuthGuard

Protege rutas que requieren autenticación.

```typescript
const routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  }
];
```

### AdminGuard

Protege rutas que requieren rol de administrador.

```typescript
const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  }
];
```

## Signals de Angular 21

La aplicación utiliza Signals para reactividad moderna:

```typescript
// En AuthService
public isAuthenticated = computed(() => !!this.tokenSignal() && !!this.userSignal());
public currentUser = computed(() => this.userSignal());
public isAdmin = computed(() => this.userSignal()?.role === 'admin');

// En CartService
public itemCount = computed(() => 
  this.cartSignal().reduce((total, item) => total + item.quantity, 0)
);
public total = computed(() => 
  this.cartSignal().reduce((sum, item) => sum + item.subtotal, 0)
);
```

## Validación de Formularios

Los formularios utilizan validadores reactivos con reglas personalizadas:

```typescript
// Validación de contraseña
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Requisitos:
// - Mínimo 8 caracteres
// - Al menos una mayúscula
// - Al menos una minúscula
// - Al menos un número
// - Al menos un carácter especial (@$!%*?&)
```

## Interceptor JWT

El interceptor JWT incluye automáticamente el token en todas las solicitudes:

```
Authorization: Bearer {token}
```

## Estilos

La aplicación utiliza SCSS para estilos modulares y reutilizables.

Características de diseño:
- Diseño elegante y refinado
- Componentes bien proporcionados
- Tipografía clara
- Espaciado generoso
- Interfaz responsiva
- Experiencia visual de alta calidad

## Compilación para Producción

```bash
npm run build
```

Esto genera los archivos optimizados en la carpeta `dist/`.

## Pruebas

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Cambios de Detección

Los componentes utilizan `ChangeDetectionStrategy.OnPush` para optimizar el rendimiento:

```typescript
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}
```

## Ciclo de Vida

Los componentes utilizan correctamente los lifecycle hooks:

```typescript
ngOnInit() {
  // Cargar datos
}

ngOnChanges(changes: SimpleChanges) {
  // Detectar cambios en inputs
}

ngOnDestroy() {
  // Desvincular observables y limpiar
}
```

## Almacenamiento Local

La aplicación utiliza localStorage para persistencia:

- Token JWT
- Datos del usuario
- Carrito de compras

## Variables de Entorno

Configurar en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  apiTimeout: 30000,
  tokenKey: 'auth_token',
  userKey: 'current_user',
};
```

## Licencia

MIT

## Autor

Prueba Técnica - 2024

## Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.
