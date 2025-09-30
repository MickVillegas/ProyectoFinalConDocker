<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user();

        // Si no hay usuario autenticado
        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        // Si el rol no coincide
        if ($user->rol !== $role) {
            return response()->json(['error' => 'Acceso denegado'], 403);
        }

        return $next($request);
    }
}
