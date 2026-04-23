<?php

namespace App\Http\Controllers;

use App\Services\PurchaseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Controlador de Compras.
 * 
 * Maneja compras de productos con validación de inventario.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class PurchaseController extends Controller
{
    /**
     * Servicio de compras.
     *
     * @var PurchaseService
     */
    protected PurchaseService $purchaseService;

    /**
     * Constructor del controlador.
     *
     * @param PurchaseService $purchaseService
     */
    public function __construct(PurchaseService $purchaseService)
    {
        $this->purchaseService = $purchaseService;
    }

    /**
     * Realizar una compra de producto.
     *
     * @param Request $request
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function purchase(Request $request): JsonResponse
    {
        try {
            $user = JWTAuth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no autenticado.'
                ], 401);
            }

            $request->validate([
                'product_id' => 'required|integer|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);

            $purchase = $this->purchaseService->purchaseProduct(
                $user,
                $request->product_id,
                $request->quantity
            );

            return response()->json([
                'success' => true,
                'message' => 'Compra realizada exitosamente.',
                'data' => $purchase->load('product')
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error en la validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al realizar compra.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener compras del usuario autenticado.
     *
     * @return JsonResponse
     */
    public function myPurchases(): JsonResponse
    {
        try {
            $user = JWTAuth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no autenticado.'
                ], 401);
            }

            $purchases = $this->purchaseService->getUserPurchases($user->id);

            return response()->json([
                'success' => true,
                'data' => $purchases
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener compras.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener todas las compras (solo admin).
     *
     * @return JsonResponse
     */
    public function allPurchases(): JsonResponse
    {
        try {
            $purchases = $this->purchaseService->getAllPurchases();

            return response()->json([
                'success' => true,
                'data' => $purchases
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener compras.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener detalles de una compra.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $purchase = $this->purchaseService->getPurchaseById($id);

            if (!$purchase) {
                return response()->json([
                    'success' => false,
                    'message' => 'Compra no encontrada.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $purchase
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener compra.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener estadísticas de compras (solo admin).
     *
     * @return JsonResponse
     */
    public function stats(): JsonResponse
    {
        try {
            $stats = $this->purchaseService->getPurchaseStats();

            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
