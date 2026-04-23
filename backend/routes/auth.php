<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/**
 * Rutas de Autenticación
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */

Route::controller(AuthController::class)->group(function () {
    // Rutas públicas
    Route::post('/register', 'register')->name('auth.register');
    Route::post('/login', 'login')->name('auth.login');

    // Rutas protegidas
    Route::middleware('jwt.auth')->group(function () {
        Route::get('/me', 'me')->name('auth.me');
        Route::post('/logout', 'logout')->name('auth.logout');
    });
});
