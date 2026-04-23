# Guía de Instalación - Sistema de Gestión de Usuarios y Productos

## 📋 Requisitos Previos

### Backend (Laravel 12)
- PHP 8.2 o superior
- Composer
- PostgreSQL 12 o superior
- Git

### Frontend (Angular 21)
- Node.js 18+ y npm
- Angular CLI 21
- Git

## 🔧 Instalación Paso a Paso

### PASO 1: Backend (Laravel 12)

#### 1.1 Navegar al directorio backend

```bash
cd backend
```

#### 1.2 Instalar dependencias PHP

```bash
composer install
```

#### 1.3 Copiar archivo de configuración

```bash
cp .env.example .env
```

#### 1.4 Editar variables de entorno

Abrir `.env` y configurar:

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

JWT_SECRET=your_jwt_secret_key_here_change_in_production
CORS_ALLOWED_ORIGINS=http://localhost:4200,http://localhost:3000
```

#### 1.5 Generar clave de aplicación

```bash
php artisan key:generate
```

#### 1.6 Crear base de datos PostgreSQL

```bash
createdb gestion_usuarios_productos
```

**Nota**: Asegúrate de que PostgreSQL está corriendo y que tienes credenciales válidas.

#### 1.7 Ejecutar migraciones

```bash
php artisan migrate
```

#### 1.8 Ejecutar seeders (datos de prueba)

```bash
php artisan db:seed
```

Esto creará:
- **Usuario Admin**: `admin@example.com` / `Admin@12345`
- **Usuarios regulares**: `juan@example.com`, `maria@example.com`, `carlos@example.com`
- **10 productos** de prueba

#### 1.9 Iniciar servidor Laravel

```bash
php artisan serve
```

✅ Backend disponible en: `http://localhost:8000`

---

### PASO 2: Frontend (Angular 21)

#### 2.1 Navegar al directorio frontend

```bash
cd ../frontend
```

#### 2.2 Instalar dependencias Node

```bash
npm install
```

#### 2.3 Configurar variables de entorno (opcional)

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

#### 2.4 Iniciar servidor Angular

```bash
npm start
```

✅ Frontend disponible en: `http://localhost:4200`

---

## 🧪 Pruebas Iniciales

### 1. Verificar que ambos servidores estén corriendo

```bash
# Terminal 1 - Backend
cd backend && php artisan serve

# Terminal 2 - Frontend
cd frontend && npm start
```

### 2. Abrir navegador

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:4200`

### 3. Probar login

1. Ir a `http://localhost:4200`
2. Hacer clic en "Login"
3. Usar credenciales:
   - Email: `admin@example.com`
   - Contraseña: `Admin@12345`

### 4. Probar con Postman

1. Importar `postman_collection.json`
2. Configurar variable `baseUrl`: `http://localhost:8000/api`
3. Hacer login y copiar token en variable `token`
4. Probar endpoints

---

## 🐛 Solución de Problemas

### Backend no inicia

**Error: "Connection refused"**
- Verificar que PostgreSQL está corriendo
- Verificar credenciales en `.env`
- Ejecutar: `psql -U postgres -c "SELECT version();"`

**Error: "SQLSTATE[HY000]"**
- Crear base de datos: `createdb gestion_usuarios_productos`
- Ejecutar migraciones: `php artisan migrate`

### Frontend no inicia

**Error: "npm: command not found"**
- Instalar Node.js desde https://nodejs.org/
- Verificar: `node -v` y `npm -v`

**Error: "port 4200 already in use"**
- Cambiar puerto: `ng serve --port 4300`

### CORS errors

- Verificar `CORS_ALLOWED_ORIGINS` en `.env` del backend
- Asegurarse que incluye `http://localhost:4200`

### Token inválido

- Limpiar localStorage: `localStorage.clear()` en consola
- Hacer login nuevamente
- Verificar que `JWT_SECRET` es consistente

---

## 📚 Documentación Completa

- **Backend**: Ver `backend/README.md`
- **Frontend**: Ver `frontend/README.md`
- **Proyecto**: Ver `README.md`

---

## 🚀 Próximos Pasos

1. ✅ Explorar el dashboard de admin
2. ✅ Crear nuevos usuarios
3. ✅ Agregar productos
4. ✅ Realizar compras
5. ✅ Ver historial de compras

---

## 📞 Soporte

Si encuentras problemas:

1. Verificar que todos los requisitos estén instalados
2. Revisar los logs en la consola
3. Consultar la documentación en `README.md`
4. Revisar `backend/README.md` y `frontend/README.md`

---

## ✅ Checklist de Instalación

- [ ] PHP 8.2+ instalado
- [ ] Composer instalado
- [ ] PostgreSQL instalado y corriendo
- [ ] Node.js 18+ instalado
- [ ] npm instalado
- [ ] Backend clonado y configurado
- [ ] Base de datos creada
- [ ] Migraciones ejecutadas
- [ ] Seeders ejecutados
- [ ] Backend iniciado en puerto 8000
- [ ] Frontend clonado y configurado
- [ ] Frontend iniciado en puerto 4200
- [ ] Login exitoso con credenciales de prueba
- [ ] Postman configurado

---

¡Listo! 🎉 La aplicación está completamente instalada y funcionando.
