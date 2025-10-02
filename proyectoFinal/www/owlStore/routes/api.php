<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BibliotecaController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\JuegosController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\cartController;

use App\Http\Controllers\RestControllerAuth;

Route::get('/cart/{idUsuario}', [cartController::class, 'obtenerCarrito']);
Route::delete('/cart/borrar/{idUsuario}', [cartController::class, 'borrarCarrito']);
Route::post('/cart/subir', [cartController::class, 'subirCarritoNuevo']);

Route::post('/library/subir', [BibliotecaController::class, 'subirJuegoALaBiblioteca']);
Route::post('/register', [RestControllerAuth::class, 'register']);
Route::post('/login', [RestControllerAuth::class, 'login']);

Route::middleware('auth:sanctum')->put('/user/obtenerDineroVenta/{id}/{precio}', [UsuariosController::class, 'recibirDineroJuegoComprado']);

Route::middleware('auth:sanctum')->put('/game/venta/{id}', [JuegosController::class, 'aumentarNumeroVenta']);

Route::middleware(['auth:sanctum'])->put('/user/{id}', [UsuariosController::class, 'actualizarUsuario']);
Route::middleware(['auth:sanctum'])->get('/user/{id}', [UsuariosController::class, 'obtenerUnUsuario']);
Route::middleware(['auth:sanctum'])->delete('/user/{id}', [UsuariosController::class, 'borrarUsuario']);
Route::middleware(['auth:sanctum'])->delete('/game/{id}', [JuegosController::class, 'borrarUnJuego']);
Route::middleware(['auth:sanctum'])->put('/game/{id}', [JuegosController::class, 'actualizarJuego']);
Route::middleware(['auth:sanctum'])->post('/game', [JuegosController::class, 'subirJuego']);
Route::middleware(['auth:sanctum'])->put('/user/actuazilarBilletera/{id}', [UsuariosController::class, 'actualizarBilleteraUsuario']);

Route::post('/tag/subir', [TagController::class, 'publicarTag']);
Route::delete('/tag/borrar/{id}', [TagController::class, 'borrarTag']);

Route::post('/user', [UsuariosController::class, 'subirUsuario']);

Route::get('/tags', [TagController::class, 'obtenerEtiquetas']);
Route::get('/game/desarrollador/{id}', [JuegosController::class, 'obtenerJuegosPorUsuario']);

 Route::get('/game/mejoresJuegos/desarrollador/{id}', [JuegosController::class, 'losTresJuegosMasVendidosPorVendedor']);
//Route::get('/user', [UsuariosController::class, 'obtenerUsuarios']);
Route::get('/game/busqueda/{nombreJuego}', [JuegosController::class, 'buscarPorNombreJuego']);
Route::get('/user/busqueda/{nombreUsuario}', [UsuariosController::class, 'buscarPorNombreUusario']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [RestControllerAuth::class, 'logout']);
    Route::get('/me', [RestControllerAuth::class, 'me']);
});

// ==========================================
// 👥 Rutas de USUARIOS
// ==========================================

// Solo admin puede ver todos, crear, actualizar o eliminar usuarios
Route::middleware(['auth:sanctum'])->group(function () {
   Route::get('/user', [UsuariosController::class, 'obtenerUsuarios']);
});

// Cualquier usuario autenticado puede ver su propio perfil, crear una cuenta, actualizarla o borrarla
/*
Route::middleware(['auth:sanctum'])->get('/user/{id}', [UsuariosController::class, 'obtenerUnUsuario']);
Route::post('/user', [UsuariosController::class, 'subirUsuario']);
Route::delete('/user/{id}', [UsuariosController::class, 'borrarUsuario']);
*/

// ==========================================
// 🎮 Rutas de JUEGOS
// ==========================================

// Todos los usuarios autenticados pueden ver juegos (compradores, vendedores, admin)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/game', [JuegosController::class, 'obtenerJuegos']);
    Route::get('/game/best', [JuegosController::class, 'obtenerTresMejoresJuegos']);
    Route::get('/game/genero/{genero}', [JuegosController::class, 'obtenerJuegosPorGenero']);
    Route::get('/game/{id}', [JuegosController::class, 'obtenerUnJuego']);
    Route::get('/library/{id}', [BibliotecaController::class, 'obtenerJuegosUsuario']);
    
   

});

// Admin y vendedores pueden subir juegos

// Admin y vendedores pueden actualizar o borrar juegos
Route::middleware(['auth:sanctum', 'role:admin,vendedor'])->group(function () {
    //Route::put('/game/{id}', [JuegosController::class, 'actualizarJuego']);
    // Nota: validación de dueño del juego se hace dentro del controlador
});


// ==========================================
// 📚 Biblioteca del usuario (relación juegos-usuarios)
// ==========================================

// Cualquier usuario autenticado puede ver su propia biblioteca




use Illuminate\Support\Facades\Response;

// Manejar todas las peticiones OPTIONS (preflight CORS)
Route::options('{any}', function () {
    return Response::json([], 200);
})->where('any', '.*');