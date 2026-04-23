<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/**
 * Rutas de Usuarios
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */

Route::middleware('jwt.auth')->group(function () {
    // Rutas de perfil (para cualquier usuario autenticado)
    Route::get('/profile', [UserController::class, 'profile'])->name('users.profile');
    Route::put('/profile', [UserController::class, 'updateProfile'])->name('users.updateProfile');

    // Rutas de administración (solo admin)
    Route::middleware('admin')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
        Route::post('/', [UserController::class, 'store'])->name('users.store');
        Route::get('/{id}', [UserController::class, 'show'])->name('users.show');
        Route::put('/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::put('/{id}/role', [UserController::class, 'changeRole'])->name('users.changeRole');
    });
});
