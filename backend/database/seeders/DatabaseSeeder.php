<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Seeder principal de la base de datos.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Ejecutar los seeders de la base de datos.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
