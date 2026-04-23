<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Controlador de Usuarios.
 * 
 * Maneja CRUD de usuarios y cambio de roles.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class UserController extends Controller
{
    /**
     * Obtener todos los usuarios.
     *
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function index(): JsonResponse
    {
        try {
            $users = User::all();

            return response()->json([
                'success' => true,
                'data' => $users
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener usuarios.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener un usuario por ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no encontrado.'
                ], 404);
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
     * Crear un nuevo usuario.
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
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'role' => 'required|in:admin,user',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Usuario creado exitosamente.',
                'data' => $user
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
                'message' => 'Error al crear usuario.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar un usuario.
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
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no encontrado.'
                ], 404);
            }

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $id,
                'password' => 'sometimes|string|min:8',
                'role' => 'sometimes|in:admin,user',
            ]);

            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->has('email')) {
                $user->email = $request->email;
            }

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            if ($request->has('role')) {
                $user->role = $request->role;
            }

            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Usuario actualizado exitosamente.',
                'data' => $user
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
                'message' => 'Error al actualizar usuario.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un usuario.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no encontrado.'
                ], 404);
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Usuario eliminado exitosamente.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar usuario.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cambiar rol de un usuario.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function changeRole(Request $request, int $id): JsonResponse
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no encontrado.'
                ], 404);
            }

            $request->validate([
                'role' => 'required|in:admin,user',
            ]);

            $user->role = $request->role;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Rol actualizado exitosamente.',
                'data' => $user
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
                'message' => 'Error al cambiar rol.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener perfil del usuario autenticado.
     *
     * @return JsonResponse
     */
    public function profile(): JsonResponse
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
                'message' => 'Error al obtener perfil.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar perfil del usuario autenticado.
     *
     * @param Request $request
     * @return JsonResponse
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function updateProfile(Request $request): JsonResponse
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
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'password' => 'sometimes|string|min:8',
            ]);

            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->has('email')) {
                $user->email = $request->email;
            }

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Perfil actualizado exitosamente.',
                'data' => $user
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
                'message' => 'Error al actualizar perfil.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
