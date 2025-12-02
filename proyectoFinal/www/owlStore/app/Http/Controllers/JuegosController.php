<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Game;
use \App\Models\User;

class JuegosController extends Controller
{
    public function obtenerJuegos(Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $juegos = Game::orderBy('id_juego', 'DESC')->paginate();

        if($juegos->isEmpty()){
            return response()->json(["respuesta" => "No hay juegos en la lista, añade un juego a la lista"], 404);
        }

        return response()->json($juegos);
    }

    public function obtenerUnJuego(string $id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $unJuego = Game::where('id_juego', $id)->first();

        if(!$unJuego){
            return response()->json(["respuesta" => "No exsite un juego con la id " .$id], 404);
        }

        return response()->json($unJuego);
    }

    public function obtenerTresMejoresJuegos(Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $juegos = Game::orderByRaw('CAST(ventas AS SIGNED) DESC')->take(3)->get();

        if($juegos->isEmpty()){
            return response()->json(["respuesta" => "No hay juegos en la lista, añade un juego a la lista"], 404);
        }

        return response()->json($juegos);
    }

    public function losTresJuegosMasVendidosPorVendedor($id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }
        $juegos = Game::where('id_usuario_publicador', $id)
              ->orderByRaw('CAST(ventas AS SIGNED) DESC')
              ->take(3)
              ->get();

        if ($juegos->isEmpty()) {
            return response()->json(["respuesta" => "Este usuario no tiene juegos."], 404);
        }

        return response()->json($juegos);
    }

    public function obtenerJuegosPorGenero(string $genero, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $juegos = Game::where('genero', $genero)->paginate();
        return response()->json($juegos);
    }

    public function obtenerJuegosPorUsuario(string $id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $juegos = Game::where('id_usuario_publicador', $id)->paginate();
        return response()->json($juegos);
    }

    public function borrarUnJuego(string $id, Request $req){
        
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $unJuego = Game::where('id_juego', $id)->first();

        if(!$unJuego){
            return response()->json(["respuesta" => "No exsite un juego con la id " .$id], 404);
        }

        if ($user->rol === 'admin') {
            $unJuego->delete();
            return response()->json(["respuesta" => "Juego borrado con exito"], 200);
        }

        if ($user->rol === 'vendedor' && $unJuego->id_usuario_publicador == $user->id) {
            $unJuego->delete();
            return response()->json(["respuesta" => "Juego borrado con exito"], 200);
        }
        else{
            return response()->json(["respuesta" => "No tienes permiso para borrar este juego"], 403);
        }

        return response()->json(["respuesta" => "No tienes permiso para borrar este juego"], 403);

    }

   public function subirJuego(Request $req)
{
    $user = auth()->user();

    if(!$user){
        return response()->json(["respuesta" => "No autenticado"], 401);
    }

$req->validate([
    'nombre_juego' => 'required|string|max:255',
    'fecha_salida' => 'required|date',
    'precio' => 'required|numeric|min:0',
    'genero' => 'required|string|max:255',
    'pegi' => 'required|integer|min:3|max:21',
    'descripcion' => 'required|string|max:2000',
    'id_usuario_publicador' => 'required|integer|exists:users,id',
], [
    'nombre_juego.required' => 'El campo nombre del juego es obligatorio.',
    'fecha_salida.required' => 'El campo fecha de salida es obligatorio.',
    'fecha_salida.date' => 'La fecha de salida no tiene un formato válido.',
    'precio.required' => 'El campo precio es obligatorio.',
    'precio.numeric' => 'El precio debe ser un número.',
    'genero.required' => 'El campo género es obligatorio.',
    'pegi.required' => 'El campo PEGI es obligatorio.',
    'descripcion.required' => 'El campo descripción es obligatorio.',
]);

    if ($user->rol == 'vendedor' || $user->rol == 'admin') {
        Game::create([
            "nombre_juego" => $req->nombre_juego,
            "fecha_salida" => $req->fecha_salida,
            "precio" => $req->precio,
            "genero" => $req->genero,
            "pegi" => $req->pegi,
            "ventas" => 0,
            "descripcion" => $req->descripcion,
            "id_usuario_publicador" => $req->id_usuario_publicador
        ]);

        return response()->json(["respuesta" => "Juego nuevo publicado con éxito"], 200);
    }

    return response()->json(["respuesta" => "No tienes permiso para crear un juego"], 403);
}

    public function actualizarJuego(string $id, Request $req)
{
    $user = $req->user();

    if (!$user) {
        return response()->json(["respuesta" => "No estás autenticado."], 401);
    }

$req->validate([
    'nombre_juego' => 'required|string|max:255',
    'fecha_salida' => 'required|date',
    'precio' => 'required|numeric|min:0',
    'genero' => 'required|string|max:255',
    'pegi' => 'required|integer|min:3|max:21',
    'descripcion' => 'required|string|max:2000',
    'id_usuario_publicador' => 'required|integer|exists:users,id',
], [
    'nombre_juego.required' => 'El campo nombre del juego es obligatorio.',
    'fecha_salida.required' => 'El campo fecha de salida es obligatorio.',
    'fecha_salida.date' => 'La fecha de salida no tiene un formato válido.',
    'precio.required' => 'El campo precio es obligatorio.',
    'precio.numeric' => 'El precio debe ser un número.',
    'genero.required' => 'El campo género es obligatorio.',
    'pegi.required' => 'El campo PEGI es obligatorio.',
    'descripcion.required' => 'El campo descripción es obligatorio.',
]);

    $unJuego = Game::where('id_juego', $id)->first();

    if (!$unJuego) {
        return response()->json(["respuesta" => "No existe un juego con la id " . $id], 404);
    }

    if ($user->rol == "admin" || ($user->rol == "vendedor" && $unJuego->id_usuario_publicador == $user->id)) {
        $unJuego->update([
            'nombre_juego' => $req->nombre_juego,
            'fecha_salida' => $req->fecha_salida,
            'precio' => $req->precio,
            'genero' => $req->genero,
            'pegi' => $req->pegi,
            'descripcion' => $req->descripcion,
            'id_usuario_publicador' => $req->id_usuario_publicador,
        ]);

        return response()->json(["respuesta" => "Juego actualizado con éxito"], 200);
    }

    return response()->json(["respuesta" => "No tienes permiso para actualizar este juego"], 403);
}

    public function buscarPorNombreJuego(String $nombreJuego, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["rep" => "No autenticado"], 401);
        }
        
        $juegos = Game::where('nombre_juego', 'LIKE', "%{$nombreJuego}%")->get();

        if(!$juegos){
            return response()->json(["respuesta" => "No exsisten coincidencias con el nombre " .$nombreJuego], 404);
        }

        return response()->json($juegos);
    }

    public function aumentarNumeroVenta(String $id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["rep" => "No autenticado"], 401);
        }

        $juego = Game::where("id_juego", $id)->first();

        if(!$juego){
            return response()->json(["rep" => "No exsiste un usuario con id " .$id], 404);
        }

        $suma = intval($juego->ventas) + 1;

        $juego->ventas = $suma; 
        $juego->save();

        return response()->json(["respuesta" => "Venta Nueva"], 200);
    }

}
