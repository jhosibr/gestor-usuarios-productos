<?php

use Illuminate\Support\Facades\Route;

/**
 * API Routes
 * 
 * Todas las rutas de la API están prefijadas con /api
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */

// Rutas de autenticación
Route::prefix('auth')->group(base_path('routes/auth.php'));

// Rutas de usuarios
Route::prefix('users')->group(base_path('routes/users.php'));

// Rutas de productos
Route::prefix('products')->group(base_path('routes/products.php'));

// Rutas de compras
Route::prefix('purchases')->group(base_path('routes/purchases.php'));

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is running'
    ]);
});
