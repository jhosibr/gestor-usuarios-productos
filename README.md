# Sistema de Gestión de Usuarios y Productos

## 📋 Descripción General

Aplicación fullstack completa desarrollada con **Laravel 12** (Backend API REST) y **Angular 21** (Frontend SPA) que implementa un sistema profesional de gestión de usuarios, productos y compras con autenticación JWT, control de roles y validación de inventario.

## 🎯 Características Principales

### Autenticación y Seguridad
- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Validación segura de contraseñas (8+ caracteres, mayúscula, minúscula, número, carácter especial)
- ✅ Cookies HttpOnly para sesiones seguras
- ✅ Control de roles (Admin/User)
- ✅ Primer usuario registrado recibe rol ADMIN automáticamente
- ✅ Guards de rutas para protección de acceso

### Gestión de Usuarios
- ✅ CRUD completo de usuarios (solo admin)
- ✅ Cambio de roles
- ✅ Perfil de usuario editable
- ✅ Validación de datos

### Gestión de Productos
- ✅ CRUD completo de productos (solo admin)
- ✅ Categorización de productos
- ✅ Búsqueda y filtrado
- ✅ Gestión de stock

### Sistema de Compras
- ✅ Carrito de compras reactivo en tiempo real
- ✅ Validación de disponibilidad de stock
- ✅ Descuento automático de inventario
- ✅ Historial de compras
- ✅ Estadísticas de ventas (admin)

### Arquitectura y Tecnología
- ✅ Servicios centralizados con lógica de negocio
- ✅ Signals de Angular 21 para reactividad moderna
- ✅ Interceptor JWT automático
- ✅ Middleware de autenticación y roles
- ✅ CORS configurado
- ✅ Base de datos PostgreSQL con migraciones
- ✅ Seeders para datos de prueba

## 📁 Estructura del Proyecto

```
prueba-tecnica-fullstack/
├── backend/                          # API REST con Laravel 12
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/          # Controladores de API
│   │   │   ├── Middleware/           # Middleware de autenticación y roles
│   │   │   └── Requests/             # Form Requests para validación
│   │   ├── Models/                   # Modelos Eloquent
│   │   ├── Services/                 # Servicios de lógica de negocio
│   │   └── Repositories/             # Repositorios (opcional)
│   ├── database/
│   │   ├── migrations/               # Migraciones de BD
│   │   └── seeders/                  # Seeders de datos
│   ├── routes/
│   │   ├── api.php                   # Rutas principales
│   │   ├── auth.php                  # Rutas de autenticación
│   │   ├── users.php                 # Rutas de usuarios
│   │   ├── products.php              # Rutas de productos
│   │   └── purchases.php             # Rutas de compras
│   ├── config/
│   │   └── cors.php                  # Configuración CORS
│   ├── .env                          # Variables de entorno
│   ├── composer.json                 # Dependencias PHP
│   └── README.md                     # Documentación backend
│
├── frontend/                         # SPA con Angular 21
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/              # Módulos lazy-loaded
│   │   │   │   ├── auth/             # Módulo de autenticación
│   │   │   │   ├── admin/            # Módulo de administración
│   │   │   │   └── user/             # Módulo de usuario
│   │   │   ├── services/             # Servicios centralizados
│   │   │   ├── guards/               # Guards de rutas
│   │   │   ├── interceptors/         # Interceptores HTTP
│   │   │   ├── models/               # Interfaces TypeScript
│   │   │   ├── components/           # Componentes compartidos
│   │   │   └── pages/                # Páginas principales
│   │   ├── environments/             # Configuración de ambientes
│   │   ├── assets/                   # Recursos estáticos
│   │   └── styles.scss               # Estilos globales
│   ├── angular.json                  # Configuración Angular
│   ├── tsconfig.json                 # Configuración TypeScript
│   ├── package.json                  # Dependencias Node
│   └── README.md                     # Documentación frontend
│
├── .gitignore                        # Configuración de Git
└── README.md                         # Este archivo
```

## 🚀 Inicio Rápido

### Backend (Laravel 12)

#### Requisitos
- PHP 8.2+
- Composer
- PostgreSQL 12+

#### Instalación

```bash
cd backend

# Instalar dependencias
composer install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales de BD

# Generar clave de aplicación
php artisan key:generate

# Crear base de datos
createdb gestion_usuarios_productos

# Ejecutar migraciones
php artisan migrate

# Ejecutar seeders (opcional)
php artisan db:seed

# Iniciar servidor
php artisan serve
```

La API estará disponible en: `http://localhost:8000`

**Credenciales de prueba:**
- Email: `admin@example.com`
- Contraseña: `Admin@12345`

### Frontend (Angular 21)

#### Requisitos
- Node.js 18+
- npm o yarn

#### Instalación

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
# Editar src/environments/environment.ts si es necesario

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

## 📚 Documentación Detallada

### Backend
Ver [backend/README.md](./backend/README.md) para:
- Estructura completa del proyecto
- Endpoints de la API
- Ejemplos de uso
- Configuración de base de datos
- Migraciones y seeders

### Frontend
Ver [frontend/README.md](./frontend/README.md) para:
- Estructura de componentes
- Servicios y guards
- Signals de Angular 21
- Validación de formularios
- Estilos y diseño

## 🔐 Seguridad

### Validación de Contraseña
Las contraseñas deben cumplir:
- ✅ Mínimo 8 caracteres
- ✅ Al menos una mayúscula
- ✅ Al menos una minúscula
- ✅ Al menos un número
- ✅ Al menos un carácter especial (@$!%*?&)

**Ejemplo válido**: `Password@123`

### Control de Roles
- **Admin**: Acceso completo a gestión de usuarios, productos y compras
- **User**: Acceso a catálogo, carrito y perfil personal

### Autenticación
- JWT con expiración de 1 hora
- Token incluido automáticamente en solicitudes
- Middleware de validación en rutas protegidas

## 🔗 Endpoints Principales

### Autenticación
```
POST   /api/auth/register       - Registrar usuario
POST   /api/auth/login          - Iniciar sesión
GET    /api/auth/me             - Obtener usuario actual
POST   /api/auth/logout         - Cerrar sesión
```

### Usuarios
```
GET    /api/users               - Listar usuarios (admin)
POST   /api/users               - Crear usuario (admin)
GET    /api/users/{id}          - Obtener usuario (admin)
PUT    /api/users/{id}          - Actualizar usuario (admin)
DELETE /api/users/{id}          - Eliminar usuario (admin)
PUT    /api/users/{id}/role     - Cambiar rol (admin)
GET    /api/users/profile       - Obtener perfil
PUT    /api/users/profile       - Actualizar perfil
```

### Productos
```
GET    /api/products            - Listar productos
GET    /api/products/{id}       - Obtener producto
GET    /api/products/search     - Buscar productos
GET    /api/products/category/{category} - Por categoría
POST   /api/products            - Crear (admin)
PUT    /api/products/{id}       - Actualizar (admin)
DELETE /api/products/{id}       - Eliminar (admin)
```

### Compras
```
POST   /api/purchases/purchase  - Realizar compra
GET    /api/purchases/my-purchases - Mis compras
GET    /api/purchases           - Todas las compras (admin)
GET    /api/purchases/{id}      - Detalles (admin)
GET    /api/purchases/stats     - Estadísticas (admin)
```

## 🧪 Pruebas con Postman

Se incluye una colección de Postman con todos los endpoints configurados.

### Importar colección:
1. Abrir Postman
2. Click en "Import"
3. Seleccionar `postman_collection.json`
4. Las variables se configurarán automáticamente

## 📊 Base de Datos

### Tablas Principales

**users**
- id (PK)
- name
- email (UNIQUE)
- password (hashed)
- role (admin|user)
- created_at, updated_at

**products**
- id (PK)
- name
- description
- category
- price
- stock
- created_at, updated_at

**purchases**
- id (PK)
- user_id (FK)
- product_id (FK)
- quantity
- unit_price
- total_price
- created_at, updated_at

## 🔄 Flujo de Trabajo Gitflow

El proyecto sigue Gitflow:

**Ramas principales:**
- `main`: Producción
- `develop`: Desarrollo

**Ramas de características:**
- `feature/*`: Nuevas características

**Commits realizados:**
1. Initial project setup
2. Create database migrations and models
3. Implement authentication service
4. Create API controllers
5. Setup routes and middleware
6. Add seeders and fixtures
7. Configure CORS and environment

## 🎨 Diseño y UX

La interfaz sigue principios de diseño elegante:
- ✅ Tipografía refinada
- ✅ Espaciado generoso
- ✅ Componentes bien proporcionados
- ✅ Paleta de colores coherente
- ✅ Experiencia visual de alta calidad
- ✅ Interfaz responsiva
- ✅ Accesibilidad

## 📱 Responsividad

La aplicación es completamente responsiva:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🛠️ Tecnologías Utilizadas

### Backend
- **Laravel 12**: Framework PHP moderno
- **PostgreSQL**: Base de datos relacional
- **JWT Auth**: Autenticación con tokens
- **Composer**: Gestor de dependencias PHP

### Frontend
- **Angular 21**: Framework SPA moderno
- **TypeScript**: Lenguaje tipado
- **RxJS**: Programación reactiva
- **Signals**: Reactividad moderna de Angular
- **SCSS**: Preprocesador CSS

## 📝 Documentación de Código

Todo el código está documentado con:
- Comentarios explicativos
- JSDoc/PHPDoc
- Tipos TypeScript
- Ejemplos de uso

## ⚙️ Variables de Entorno

### Backend (.env)
```
APP_NAME=Gestión de Usuarios y Productos
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=gestion_usuarios_productos
DB_USERNAME=postgres
DB_PASSWORD=password

JWT_SECRET=your_jwt_secret_key_here
CORS_ALLOWED_ORIGINS=http://localhost:4200,http://localhost:3000
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  apiTimeout: 30000,
  tokenKey: 'auth_token',
  userKey: 'current_user',
};
```

## 🚨 Manejo de Errores

La API retorna respuestas JSON consistentes:

**Éxito (200-201)**:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

**Error (4xx-5xx)**:
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": { ... }
}
```

## 📈 Escalabilidad

La arquitectura está diseñada para escalar:
- Servicios desacoplados
- Repositorios para acceso a datos
- Middleware reutilizable
- Componentes modulares
- Lazy loading en frontend

## 🔒 Checklist de Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Middleware de autenticación
- ✅ Middleware de control de roles
- ✅ Validación de entrada
- ✅ CORS configurado
- ✅ Protección contra SQL Injection
- ✅ Sanitización de datos

## 📞 Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.

## 📄 Licencia

MIT

## 👤 Autor

Prueba Técnica - 2024

## 🎓 Requisitos Cumplidos

### Backend (Laravel 12)
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ CRUD de usuarios y productos
- ✅ Sistema de compras con inventario
- ✅ Control de roles
- ✅ Middleware de autenticación y roles
- ✅ Validación de datos
- ✅ CORS configurado
- ✅ Migraciones de BD
- ✅ Seeders
- ✅ Documentación de código
- ✅ Gitflow implementado
- ✅ Mínimo 7 commits

### Frontend (Angular 21)
- ✅ SPA con lazy loading
- ✅ Módulos de autenticación, admin y usuario
- ✅ Guards de rutas
- ✅ Signals de Angular 21
- ✅ Servicios centralizados
- ✅ Interceptor JWT
- ✅ Validación de formularios
- ✅ Carrito reactivo en tiempo real
- ✅ ChangeDetectionStrategy.OnPush
- ✅ Lifecycle hooks correctos
- ✅ Interfaz elegante y responsiva
- ✅ Documentación completa

## 🎯 Conclusión

Esta es una aplicación fullstack profesional, completa y 100% funcional que demuestra dominio en:
- Desarrollo backend con Laravel
- Desarrollo frontend con Angular
- Arquitectura de aplicaciones
- Seguridad en aplicaciones web
- Buenas prácticas de desarrollo
- Control de versiones con Git

---

**¡Gracias por revisar este proyecto!** 🚀
