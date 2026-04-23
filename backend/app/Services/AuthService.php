<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Servicio de Autenticación.
 * 
 * Maneja registro, login, validación de contraseñas y tokens JWT.
 * 
 * @author Prueba Técnica
 * @since 2024/04
 */
class AuthService
{
    /**
     * Validar formato de contraseña.
     * 
     * Requisitos:
     * - Mínimo 8 caracteres
     * - Al menos una mayúscula
     * - Al menos una minúscula
     * - Al menos un número
     * - Al menos un carácter especial
     *
     * @param string $password
     * @return bool
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function validatePassword(string $password): bool
    {
        $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
        return preg_match($pattern, $password) === 1;
    }

    /**
     * Registrar un nuevo usuario.
     * 
     * Si es el primer usuario, se asigna rol ADMIN.
     * Los siguientes usuarios reciben rol USER.
     *
     * @param array $data
     * @return array
     * @throws ValidationException
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function register(array $data): array
    {
        // Validar contraseña
        if (!$this->validatePassword($data['password'])) {
            throw ValidationException::withMessages([
                'password' => [
                    'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y carácter especial.'
                ]
            ]);
        }

        // Verificar si el email ya existe
        if (User::where('email', $data['email'])->exists()) {
            throw ValidationException::withMessages([
                'email' => ['El email ya está registrado.']
            ]);
        }

        // Determinar rol: primer usuario es ADMIN, resto son USER
        $role = User::count() === 0 ? 'admin' : 'user';

        // Crear usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $role,
        ]);

        // Generar token JWT
        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
            'role' => $role,
        ];
    }

    /**
     * Autenticar un usuario (login).
     *
     * @param string $email
     * @param string $password
     * @return array
     * @throws ValidationException
     * 
     * @author Prueba Técnica
     * @since 2024/04
     */
    public function login(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.']
            ]);
        }

        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    /**
     * Obtener el usuario autenticado actual.
     *
     * @return User|null
     */
    public function getCurrentUser(): ?User
    {
        return JWTAuth::user();
    }

    /**
     * Verificar si el usuario actual es administrador.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        $user = $this->getCurrentUser();
        return $user && $user->isAdmin();
    }

    /**
     * Cerrar sesión (invalidar token).
     *
     * @return bool
     */
    public function logout(): bool
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
