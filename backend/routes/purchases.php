<?php

use App\Http\Controllers\PurchaseController;
use Illuminate\Support\Facades\Route;

/**
 * Rutas de Compras
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */

Route::middleware('jwt.auth')->controller(PurchaseController::class)->group(function () {
    // Rutas para usuarios autenticados
    Route::post('/purchase', 'purchase')->name('purchases.purchase');
    Route::get('/my-purchases', 'myPurchases')->name('purchases.myPurchases');

    // Rutas para admin
    Route::middleware('admin')->group(function () {
        Route::get('/', 'allPurchases')->name('purchases.allPurchases');
        Route::get('/stats', 'stats')->name('purchases.stats');
        Route::get('/{id}', 'show')->name('purchases.show');
    });
});
