# API REST - Sistema de Gestión de Usuarios y Productos

## Descripción

API REST desarrollada con **Laravel 12** que proporciona funcionalidades completas para gestionar usuarios, productos y compras con autenticación JWT, control de roles y validación de inventario.

## Características

- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Validación segura de contraseñas (8+ caracteres, mayúscula, minúscula, número, carácter especial)
- ✅ Control de roles (Admin/User)
- ✅ Primer usuario registrado recibe rol ADMIN automáticamente
- ✅ CRUD completo de usuarios y productos
- ✅ Sistema de compras con validación de inventario
- ✅ Middleware de autenticación y control de roles
- ✅ Configuración CORS para frontend
- ✅ Base de datos PostgreSQL con migraciones
- ✅ Seeders para datos de prueba
- ✅ Documentación de código completa

## Requisitos Previos

- PHP 8.2 o superior
- Composer
- PostgreSQL 12 o superior
- Git

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd backend
```

### 2. Instalar dependencias

```bash
composer install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` y configurar:

```env
APP_NAME="Gestión de Usuarios y Productos"
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

### 4. Generar clave de aplicación

```bash
php artisan key:generate
```

### 5. Crear base de datos

```bash
createdb gestion_usuarios_productos
```

### 6. Ejecutar migraciones

```bash
php artisan migrate
```

### 7. Ejecutar seeders (opcional)

```bash
php artisan db:seed
```

Esto creará:
- **Usuario Admin**: admin@example.com / Admin@12345
- **Usuarios regulares**: juan@example.com, maria@example.com, carlos@example.com (todos con contraseña User@12345)
- **10 productos de prueba** en diferentes categorías

## Ejecutar la aplicación

```bash
php artisan serve
```

La API estará disponible en: `http://localhost:8000`

## Estructura del Proyecto

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Controladores de la API
│   │   ├── Middleware/       # Middleware de autenticación y roles
│   │   └── Requests/         # Form Requests para validación
│   ├── Models/               # Modelos de base de datos
│   ├── Services/             # Servicios de lógica de negocio
│   └── Repositories/         # Repositorios (opcional)
├── database/
│   ├── migrations/           # Migraciones de base de datos
│   └── seeders/              # Seeders de datos de prueba
├── routes/
│   ├── api.php               # Rutas principales de API
│   ├── auth.php              # Rutas de autenticación
│   ├── users.php             # Rutas de usuarios
│   ├── products.php          # Rutas de productos
│   └── purchases.php         # Rutas de compras
├── config/
│   └── cors.php              # Configuración de CORS
└── README.md                 # Este archivo
```

## Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Obtener usuario actual | Sí |
| POST | `/api/auth/logout` | Cerrar sesión | Sí |

### Usuarios

| Método | Endpoint | Descripción | Autenticación | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/users/profile` | Obtener perfil del usuario | Sí | - |
| PUT | `/api/users/profile` | Actualizar perfil del usuario | Sí | - |
| GET | `/api/users` | Listar todos los usuarios | Sí | Admin |
| POST | `/api/users` | Crear nuevo usuario | Sí | Admin |
| GET | `/api/users/{id}` | Obtener usuario por ID | Sí | Admin |
| PUT | `/api/users/{id}` | Actualizar usuario | Sí | Admin |
| DELETE | `/api/users/{id}` | Eliminar usuario | Sí | Admin |
| PUT | `/api/users/{id}/role` | Cambiar rol de usuario | Sí | Admin |

### Productos

| Método | Endpoint | Descripción | Autenticación | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/products` | Listar todos los productos | No | - |
| GET | `/api/products/{id}` | Obtener producto por ID | No | - |
| GET | `/api/products/search` | Buscar productos | No | - |
| GET | `/api/products/category/{category}` | Obtener productos por categoría | No | - |
| POST | `/api/products` | Crear nuevo producto | Sí | Admin |
| PUT | `/api/products/{id}` | Actualizar producto | Sí | Admin |
| DELETE | `/api/products/{id}` | Eliminar producto | Sí | Admin |

### Compras

| Método | Endpoint | Descripción | Autenticación | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| POST | `/api/purchases/purchase` | Realizar compra | Sí | - |
| GET | `/api/purchases/my-purchases` | Obtener mis compras | Sí | - |
| GET | `/api/purchases` | Listar todas las compras | Sí | Admin |
| GET | `/api/purchases/stats` | Obtener estadísticas | Sí | Admin |
| GET | `/api/purchases/{id}` | Obtener detalles de compra | Sí | Admin |

## Ejemplos de Uso

### Registro

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Password@123"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin@12345"
  }'
```

### Obtener productos

```bash
curl -X GET http://localhost:8000/api/products
```

### Realizar compra

```bash
curl -X POST http://localhost:8000/api/purchases/purchase \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

## Validación de Contraseña

Las contraseñas deben cumplir con los siguientes requisitos:

- ✅ Mínimo 8 caracteres
- ✅ Al menos una letra mayúscula
- ✅ Al menos una letra minúscula
- ✅ Al menos un número
- ✅ Al menos un carácter especial (@$!%*?&)

**Ejemplo de contraseña válida**: `Password@123`

## Manejo de Errores

La API retorna respuestas JSON con la siguiente estructura:

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

## Autenticación JWT

Para acceder a endpoints protegidos, incluir el token JWT en el header:

```
Authorization: Bearer {token}
```

El token se obtiene al hacer login o registro y tiene una duración de 1 hora.

## Control de Roles

- **Admin**: Acceso completo a gestión de usuarios, productos y compras
- **User**: Acceso a catálogo de productos, carrito y perfil personal

## Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Middleware de autenticación
- ✅ Middleware de control de roles
- ✅ Validación de entrada en todos los endpoints
- ✅ CORS configurado
- ✅ Protección contra SQL Injection

## Pruebas con Postman

Se incluye una colección de Postman (`postman_collection.json`) con todos los endpoints configurados y listos para probar.

### Importar colección:

1. Abrir Postman
2. Click en "Import"
3. Seleccionar el archivo `postman_collection.json`
4. Las variables de entorno se configurarán automáticamente

## Gitflow

El proyecto sigue el flujo de trabajo Gitflow:

- `main`: Rama de producción
- `develop`: Rama de desarrollo
- `feature/*`: Ramas de características

## Commits

Se han realizado mínimo 7 commits siguiendo buenas prácticas:

1. Initial project setup
2. Create database migrations and models
3. Implement authentication service
4. Create API controllers
5. Setup routes and middleware
6. Add seeders and fixtures
7. Configure CORS and environment

## Licencia

MIT

## Autor

Prueba Técnica - 2024

## Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.
