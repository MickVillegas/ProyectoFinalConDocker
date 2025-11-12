<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RestControllerAuth extends Controller
{
    // 📌 Registro
    public function register(Request $request)
    {
        $request->validate([
            'nombre_usuario' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer',
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'rol' => 'required|in:admin,vendedor,comprador',
        ]);

        $user = User::create([
            'nombre_usuario' => $request->nombre_usuario,
            'apellidos' => $request->apellidos,
            'edad' => $request->edad,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password), // se encripta
            'rol' => $request->rol,
            'billetera' => 0, // opcional, puedes establecerlo por defecto
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Usuario registrado correctamente',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $user
        ], 201);
    }

    // 🔐 Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 401);
        }

        
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
        }
        
        

        $token = $user->createToken('auth_token')->plainTextToken;

        $textoDePrueba = "";

        if ($user->rol === 'admin') {
            $textoDePrueba = "JUEGOS,USUARIOS,ETIQUETAS,PERFIL";
        } else if ($user->rol === 'vendedor') {
            $textoDePrueba = "TUS JUEGOS,ESTADISTICAS,PERFIL";
        } else if ($user->rol === 'comprador') {
            $textoDePrueba = "TIENDA,BIBLIOTECA,PERFIL";
        }

        return response()->json([
            'mensaje' => 'Login exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $user,
            'texto' => $textoDePrueba,
            'id' => $user->id,
            'billetera' => $user->billetera, 
        ]);
    }

    // 🚪 Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['mensaje' => 'Sesión cerrada correctamente']);
    }

    // 👤 Obtener usuario autenticado
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
