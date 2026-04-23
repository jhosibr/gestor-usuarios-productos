<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Middleware de Autenticación JWT.
 * 
 * Valida que la solicitud contenga un token JWT válido.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class AuthenticateWithJWT
{
    /**
     * Procesar la solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Obtener token del header Authorization
            $token = JWTAuth::getToken();

            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token no proporcionado.'
                ], 401);
            }

            // Validar token
            $user = JWTAuth::authenticate($token);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no encontrado.'
                ], 401);
            }

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido o expirado.'
            ], 401);
        }

        return $next($request);
    }
}
