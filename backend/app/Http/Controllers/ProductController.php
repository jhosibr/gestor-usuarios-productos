<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

/**
 * Controlador de Productos.
 * 
 * Maneja CRUD de productos.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class ProductController extends Controller
{
    /**
     * Servicio de productos.
     *
     * @var ProductService
     */
    protected ProductService $productService;

    /**
     * Constructor del controlador.
     *
     * @param ProductService $productService
     */
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Obtener todos los productos.
     *
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function index(): JsonResponse
    {
        try {
            $products = $this->productService->getAllProducts();

            return response()->json([
                'success' => true,
                'data' => $products
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener productos.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener un producto por ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $product = $this->productService->getProductById($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Producto no encontrado.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $product
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener producto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear un nuevo producto.
     *
     * @param Request $request
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'category' => 'required|string|max:100',
                'price' => 'required|numeric|min:0.01',
                'stock' => 'required|integer|min:0',
            ]);

            $product = $this->productService->createProduct($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Producto creado exitosamente.',
                'data' => $product
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
                'message' => 'Error al crear producto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar un producto.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'category' => 'sometimes|string|max:100',
                'price' => 'sometimes|numeric|min:0.01',
                'stock' => 'sometimes|integer|min:0',
            ]);

            $product = $this->productService->updateProduct($id, $request->all());

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Producto no encontrado.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Producto actualizado exitosamente.',
                'data' => $product
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error en la validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar producto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un producto.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $deleted = $this->productService->deleteProduct($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Producto no encontrado.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Producto eliminado exitosamente.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar producto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Buscar productos.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'q' => 'required|string|min:1',
            ]);

            $products = $this->productService->searchProducts($request->q);

            return response()->json([
                'success' => true,
                'data' => $products
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error en la validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al buscar productos.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener productos por categoría.
     *
     * @param string $category
     * @return JsonResponse
     */
    public function byCategory(string $category): JsonResponse
    {
        try {
            $products = $this->productService->getProductsByCategory($category);

            return response()->json([
                'success' => true,
                'data' => $products
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener productos.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
