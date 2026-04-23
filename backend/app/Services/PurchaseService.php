<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

/**
 * Servicio de Compras.
 * 
 * Maneja compras de productos con validación de inventario.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class PurchaseService
{
    /**
     * Realizar una compra de producto.
     * 
     * Valida disponibilidad de stock, descuenta el inventario
     * y registra la compra.
     *
     * @param User $user
     * @param int $productId
     * @param int $quantity
     * @return Purchase
     * @throws ValidationException
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function purchaseProduct(User $user, int $productId, int $quantity): Purchase
    {
        // Validar cantidad
        if ($quantity <= 0) {
            throw ValidationException::withMessages([
                'quantity' => ['La cantidad debe ser mayor a 0.']
            ]);
        }

        // Obtener producto
        $product = Product::find($productId);
        
        if (!$product) {
            throw ValidationException::withMessages([
                'product_id' => ['El producto no existe.']
            ]);
        }

        // Validar stock disponible
        if (!$product->hasStock($quantity)) {
            throw ValidationException::withMessages([
                'stock' => [
                    "Stock insuficiente. Disponibles: {$product->stock}, solicitados: {$quantity}"
                ]
            ]);
        }

        // Descontar stock
        if (!$product->decrementStock($quantity)) {
            throw ValidationException::withMessages([
                'stock' => ['Error al descontar el stock. Intente nuevamente.']
            ]);
        }

        // Registrar compra
        $purchase = Purchase::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'unit_price' => $product->price,
            'total_price' => $product->price * $quantity,
        ]);

        return $purchase;
    }

    /**
     * Obtener todas las compras de un usuario.
     *
     * @param int $userId
     * @return Collection
     */
    public function getUserPurchases(int $userId): Collection
    {
        return Purchase::where('user_id', $userId)
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Obtener todas las compras del sistema.
     *
     * @return Collection
     */
    public function getAllPurchases(): Collection
    {
        return Purchase::with(['user', 'product'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Obtener detalles de una compra.
     *
     * @param int $purchaseId
     * @return Purchase|null
     */
    public function getPurchaseById(int $purchaseId): ?Purchase
    {
        return Purchase::with(['user', 'product'])->find($purchaseId);
    }

    /**
     * Obtener estadísticas de compras.
     *
     * @return array
     */
    public function getPurchaseStats(): array
    {
        $purchases = Purchase::all();

        return [
            'total_purchases' => $purchases->count(),
            'total_revenue' => $purchases->sum('total_price'),
            'average_order_value' => $purchases->count() > 0 
                ? $purchases->sum('total_price') / $purchases->count() 
                : 0,
        ];
    }
}
