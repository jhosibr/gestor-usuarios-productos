<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecutar las migraciones.
     *
     * @return void
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->timestamps();

            // Índices para optimización
            $table->index('user_id');
            $table->index('product_id');
            $table->index('created_at');
        });
    }

    /**
     * Revertir las migraciones.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
