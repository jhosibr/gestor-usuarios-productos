<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

/**
 * Seeder para crear productos de prueba.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class ProductSeeder extends Seeder
{
    /**
     * Ejecutar el seeder.
     *
     * @return void
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Laptop Dell XPS 13',
                'description' => 'Laptop ultradelgada con procesador Intel i7, 16GB RAM, 512GB SSD',
                'category' => 'Electrónica',
                'price' => 1299.99,
                'stock' => 15,
            ],
            [
                'name' => 'Mouse Logitech MX Master 3',
                'description' => 'Mouse inalámbrico de precisión para profesionales',
                'category' => 'Accesorios',
                'price' => 99.99,
                'stock' => 50,
            ],
            [
                'name' => 'Teclado Mecánico Corsair K95',
                'description' => 'Teclado mecánico RGB con switches Cherry MX',
                'category' => 'Accesorios',
                'price' => 199.99,
                'stock' => 30,
            ],
            [
                'name' => 'Monitor LG UltraWide 34"',
                'description' => 'Monitor ultraancho 34" con resolución 3440x1440',
                'category' => 'Monitores',
                'price' => 799.99,
                'stock' => 10,
            ],
            [
                'name' => 'Webcam Logitech C920',
                'description' => 'Webcam Full HD 1080p para videoconferencias',
                'category' => 'Accesorios',
                'price' => 79.99,
                'stock' => 25,
            ],
            [
                'name' => 'Headset HyperX Cloud Flight',
                'description' => 'Headset inalámbrico con sonido envolvente 7.1',
                'category' => 'Audio',
                'price' => 149.99,
                'stock' => 20,
            ],
            [
                'name' => 'SSD Samsung 970 EVO 1TB',
                'description' => 'SSD NVMe de alto rendimiento 1TB',
                'category' => 'Almacenamiento',
                'price' => 149.99,
                'stock' => 40,
            ],
            [
                'name' => 'Fuente de Poder EVGA 850W Gold',
                'description' => 'Fuente modular 850W con certificación 80+ Gold',
                'category' => 'Componentes',
                'price' => 129.99,
                'stock' => 18,
            ],
            [
                'name' => 'Tarjeta Gráfica RTX 4070',
                'description' => 'GPU NVIDIA RTX 4070 con 12GB GDDR6X',
                'category' => 'Componentes',
                'price' => 599.99,
                'stock' => 8,
            ],
            [
                'name' => 'RAM Corsair Vengeance 32GB',
                'description' => 'Memoria RAM DDR5 32GB (2x16GB) 5600MHz',
                'category' => 'Componentes',
                'price' => 179.99,
                'stock' => 35,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
