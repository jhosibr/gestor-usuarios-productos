<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/**
 * Rutas de Productos
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */

Route::controller(ProductController::class)->group(function () {
    // Rutas públicas
    Route::get('/', 'index')->name('products.index');
    Route::get('/{id}', 'show')->name('products.show');
    Route::get('/search', 'search')->name('products.search');
    Route::get('/category/{category}', 'byCategory')->name('products.byCategory');

    // Rutas protegidas (solo admin)
    Route::middleware(['jwt.auth', 'admin'])->group(function () {
        Route::post('/', 'store')->name('products.store');
        Route::put('/{id}', 'update')->name('products.update');
        Route::delete('/{id}', 'destroy')->name('products.destroy');
    });
});
