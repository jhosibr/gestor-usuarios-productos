<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Middleware de Control de Roles.
 * 
 * Verifica que el usuario autenticado tenga rol de administrador.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class CheckAdminRole
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
        $user = JWTAuth::user();

        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado. Se requiere rol de administrador.'
            ], 403);
        }

        return $next($request);
    }
}
