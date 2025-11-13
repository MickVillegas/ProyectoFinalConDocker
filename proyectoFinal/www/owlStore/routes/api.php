<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BibliotecaController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\JuegosController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\cartController;

use App\Http\Controllers\RestControllerAuth;





//comprador
Route::middleware('auth:sanctum')->get('/cart/{idUsuario}', [cartController::class, 'obtenerCarrito']);

//comprador
Route::middleware('auth:sanctum')->delete('/cart/borrar/{idUsuario}', [cartController::class, 'borrarCarrito']);

//comprador
Route::middleware('auth:sanctum')->post('/cart/subir', [cartController::class, 'subirCarritoNuevo']);

//comprador
Route::middleware('auth:sanctum')->post('/library/subir', [BibliotecaController::class, 'subirJuegoALaBiblioteca']);

//comprador, vendedor y admin
Route::post('/register', [RestControllerAuth::class, 'register']);

//comprador, vendedor y admin
Route::post('/login', [RestControllerAuth::class, 'login']);
Route::put('/cambiarContrasenia/{email}', [UsuariosController::class, 'cambiarContraseña']);


//comprador (al comprar un juego el dinero se deposita en la billetera del vendedor)
Route::middleware('auth:sanctum')->put('/user/obtenerDineroVenta/{id}/{precio}', [UsuariosController::class, 'recibirDineroJuegoComprado']);

//comprador
Route::middleware('auth:sanctum')->put('/game/venta/{id}', [JuegosController::class, 'aumentarNumeroVenta']);

//comprador, verndedor y admin
Route::middleware(['auth:sanctum'])->put('/user/{id}', [UsuariosController::class, 'actualizarUsuario']);


//comprador, admin y vendedor
Route::get('/user/{id}', [UsuariosController::class, 'obtenerUnUsuario']);

//comprador, vendedor y admin
Route::middleware(['auth:sanctum'])->delete('/user/{id}', [UsuariosController::class, 'borrarUsuario']);

//admin y vendedor
Route::middleware(['auth:sanctum'])->delete('/game/{id}', [JuegosController::class, 'borrarUnJuego']);

//admin y vendedor
Route::middleware(['auth:sanctum'])->put('/game/{id}', [JuegosController::class, 'actualizarJuego']);


//admin y vendedor
Route::middleware(['auth:sanctum'])->post('/game', [JuegosController::class, 'subirJuego']);


//comprador, admin y vendedor
Route::middleware(['auth:sanctum'])->put('/user/actuazilarBilletera/{id}', [UsuariosController::class, 'actualizarBilleteraUsuario']);

//comprador, admin y vendedor
Route::post('/user', [UsuariosController::class, 'subirUsuario']);


//comprador, admin y vendedor
Route::get('/tags', [TagController::class, 'obtenerEtiquetas']);


//comprador, admin y vendedor
Route::middleware('auth:sanctum')->get('/game/desarrollador/{id}', [JuegosController::class, 'obtenerJuegosPorUsuario']);


//vendedor
Route::middleware('auth:sanctum')->get('/game/mejoresJuegos/desarrollador/{id}', [JuegosController::class, 'losTresJuegosMasVendidosPorVendedor']);


//comprador, admin y vendedor
Route::middleware('auth:sanctum')->get('/game/busqueda/{nombreJuego}', [JuegosController::class, 'buscarPorNombreJuego']);





//comprador, admin y vendedor
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [RestControllerAuth::class, 'logout']);
    Route::get('/me', [RestControllerAuth::class, 'me']);
});




Route::middleware(['auth:sanctum'])->group(function () {


//comprador, admin y vendedor
    Route::get('/game', [JuegosController::class, 'obtenerJuegos']);


//comprador
    Route::get('/game/best', [JuegosController::class, 'obtenerTresMejoresJuegos']);

//comprador
    Route::get('/game/genero/{genero}', [JuegosController::class, 'obtenerJuegosPorGenero']);


//comprador, admin y vendedor
    Route::get('/game/{id}', [JuegosController::class, 'obtenerUnJuego']);

//comprador
    Route::get('/library/{id}', [BibliotecaController::class, 'obtenerJuegosUsuario']);
    
   

});











Route::middleware(['auth:sanctum'])->group(function(){

Route::get('/user', [UsuariosController::class, 'obtenerUsuarios']);

//admin
Route::post('/tag/subir', [TagController::class, 'publicarTag']);

//admin
Route::delete('/tag/borrar/{id}', [TagController::class, 'borrarTag']);

//admin
Route::get('/user/busqueda/{nombreUsuario}', [UsuariosController::class, 'buscarPorNombreUusario']);
});



