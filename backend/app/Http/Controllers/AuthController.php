<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Controlador de Autenticación.
 * 
 * Maneja endpoints de registro, login y logout.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class AuthController extends Controller
{
    /**
     * Servicio de autenticación.
     *
     * @var AuthService
     */
    protected AuthService $authService;

    /**
     * Constructor del controlador.
     *
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Registrar un nuevo usuario.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->register($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado exitosamente.',
                'data' => [
                    'user' => $result['user'],
                    'token' => $result['token'],
                    'role' => $result['role'],
                ]
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
                'message' => 'Error al registrar usuario.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Autenticar un usuario (login).
     *
     * @param Request $request
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $result = $this->authService->login($request->email, $request->password);

            return response()->json([
                'success' => true,
                'message' => 'Autenticación exitosa.',
                'data' => [
                    'user' => $result['user'],
                    'token' => $result['token'],
                ]
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
                'message' => 'Error en la autenticación.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener usuario autenticado actual.
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        try {
            $user = JWTAuth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no autenticado.'
                ], 401);
            }

            return response()->json([
                'success' => true,
                'data' => $user
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener usuario.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cerrar sesión del usuario.
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Sesión cerrada exitosamente.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cerrar sesión.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
