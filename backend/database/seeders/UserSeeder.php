<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seeder para crear usuarios de prueba.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class UserSeeder extends Seeder
{
    /**
     * Ejecutar el seeder.
     *
     * @return void
     */
    public function run(): void
    {
        // Usuario administrador
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@example.com',
            'password' => Hash::make('Admin@12345'),
            'role' => 'admin',
        ]);

        // Usuarios regulares
        User::create([
            'name' => 'Juan Pérez',
            'email' => 'juan@example.com',
            'password' => Hash::make('User@12345'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'María García',
            'email' => 'maria@example.com',
            'password' => Hash::make('User@12345'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'Carlos López',
            'email' => 'carlos@example.com',
            'password' => Hash::make('User@12345'),
            'role' => 'user',
        ]);
    }
}
