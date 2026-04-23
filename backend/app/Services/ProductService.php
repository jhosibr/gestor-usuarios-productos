<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

/**
 * Servicio de Productos.
 * 
 * Maneja operaciones CRUD de productos.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class ProductService
{
    /**
     * Obtener todos los productos.
     *
     * @return Collection
     */
    public function getAllProducts(): Collection
    {
        return Product::all();
    }

    /**
     * Obtener un producto por ID.
     *
     * @param int $id
     * @return Product|null
     */
    public function getProductById(int $id): ?Product
    {
        return Product::find($id);
    }

    /**
     * Crear un nuevo producto.
     *
     * @param array $data
     * @return Product
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    /**
     * Actualizar un producto.
     *
     * @param int $id
     * @param array $data
     * @return Product|null
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function updateProduct(int $id, array $data): ?Product
    {
        $product = Product::find($id);
        
        if (!$product) {
            return null;
        }

        $product->update($data);
        return $product;
    }

    /**
     * Eliminar un producto.
     *
     * @param int $id
     * @return bool
     */
    public function deleteProduct(int $id): bool
    {
        $product = Product::find($id);
        
        if (!$product) {
            return false;
        }

        return $product->delete();
    }

    /**
     * Obtener productos por categoría.
     *
     * @param string $category
     * @return Collection
     */
    public function getProductsByCategory(string $category): Collection
    {
        return Product::where('category', $category)->get();
    }

    /**
     * Buscar productos por nombre.
     *
     * @param string $search
     * @return Collection
     */
    public function searchProducts(string $search): Collection
    {
        return Product::where('name', 'ilike', "%{$search}%")
            ->orWhere('description', 'ilike', "%{$search}%")
            ->get();
    }
}
