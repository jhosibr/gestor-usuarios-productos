<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Product - Representa un producto en el catálogo.
 * 
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $category
 * @property float $price
 * @property int $stock
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class Product extends Model
{
    use HasFactory;

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'stock',
    ];

    /**
     * Obtener los atributos que deben ser convertidos.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'float',
            'stock' => 'integer',
        ];
    }

    /**
     * Relación: Un producto puede tener muchas compras.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Verificar si hay stock disponible.
     *
     * @param int $quantity
     * @return bool
     */
    public function hasStock(int $quantity): bool
    {
        return $this->stock >= $quantity;
    }

    /**
     * Descontar stock del producto.
     *
     * @param int $quantity
     * @return bool
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function decrementStock(int $quantity): bool
    {
        if (!$this->hasStock($quantity)) {
            return false;
        }

        $this->stock -= $quantity;
        return $this->save();
    }

    /**
     * Incrementar stock del producto.
     *
     * @param int $quantity
     * @return bool
     */
    public function incrementStock(int $quantity): bool
    {
        $this->stock += $quantity;
        return $this->save();
    }
}
