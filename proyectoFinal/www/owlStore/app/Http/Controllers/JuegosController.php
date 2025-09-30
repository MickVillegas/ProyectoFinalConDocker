<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Game;
use \App\Models\User;

class JuegosController extends Controller
{
    public function obtenerJuegos(){
        $juegos = Game::orderBy('id_juego', 'DESC')->paginate();

        if($juegos->isEmpty()){
            return response()->json(["respuesta" => "No hay juegos en la lista, añade un juego a la lista"], 404);
        }

        return response()->json($juegos);
    }

    public function obtenerUnJuego(string $id){
        $unJuego = Game::where('id_juego', $id)->first();

        if(!$unJuego){
            return response()->json(["respuesta" => "No exsite un juego con la id " .$id], 404);
        }

        return response()->json($unJuego);
    }

    public function obtenerTresMejoresJuegos(){
        $juegos = Game::orderBy('ventas', 'DESC')->take(3)->get();

        if($juegos->isEmpty()){
            return response()->json(["respuesta" => "No hay juegos en la lista, añade un juego a la lista"], 404);
        }

        return response()->json($juegos);
    }

    public function losTresJuegosMasVendidosPorVendedor($id){
    $juegos = Game::where('id_usuario_publicador', $id)->orderBy('ventas', 'DESC')->take(3)->get();

    return response()->json($juegos);
    }

    public function obtenerJuegosPorGenero(string $genero){
        $juegos = Game::where('genero', $genero)->paginate();
        return response()->json($juegos);
    }

    public function obtenerJuegosPorUsuario(string $id){
        $juegos = Game::where('id_usuario_publicador', $id)->paginate();
        return response()->json($juegos);
    }

    public function borrarUnJuego(string $id, Request $req){
        
        $user = $req->user();
        $unJuego = Game::where('id_juego', $id)->first();

        if(!$unJuego){
            return response()->json(["respuesta" => "No exsite un juego con la id " .$id], 404);
        }

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
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

    public function subirJuego(Request $req){
        $user = auth()->user();
        
        if($user->rol == 'vendedor' || $user->rol == 'admin'){
            Game::create(["nombre_juego" => $req->nombre_juego, "fecha_salida" => $req->fecha_salida, "precio" => $req->precio, "genero" => $req->genero, "pegi" => $req->pegi, "ventas" => $req->ventas, "descripcion" => $req->descripcion, "id_usuario_publicador" => $req->id_usuario_publicador]);
            return response()->json(["respuesta" => "Juego nuevo publicado con exito"], 200);
        }

        return response()->json(["respuesta" => "No tienes permiso para crear un juego"], 403);
    }

    public function actualizarJuego(string $id, Request $req){
        $unJuego = Game::where('id_juego', $id)->first();
        $user = $req->user();

        if(!$unJuego){
            return response()->json(["respuesta" => "No exsite un juego con la id " .$id], 404);
        }

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        if($user->rol == "admin"){
            $unJuego->nombre_juego = $req->nombre_juego;
            $unJuego->fecha_salida = $req->fecha_salida; 
            $unJuego->precio = $req->precio; 
            $unJuego->genero = $req->genero; 
            $unJuego->pegi = $req->pegi; 
            $unJuego->descripcion = $req->descripcion;
            $unJuego->id_usuario_publicador = $req->id_usuario_publicador;

            $unJuego->save();

            return response()->json(["respuesta" => "Juego actualizado con exito"], 200);
        }

        if($user->rol == "vendedor" && $unJuego->id_usuario_publicador == $user->id){
            $unJuego->nombre_juego = $req->nombre_juego;
            $unJuego->fecha_salida = $req->fecha_salida; 
            $unJuego->precio = $req->precio; 
            $unJuego->genero = $req->genero; 
            $unJuego->pegi = $req->pegi; 
            $unJuego->descripcion = $req->descripcion;
            $unJuego->id_usuario_publicador = $req->id_usuario_publicador;

            $unJuego->save();

            return response()->json(["respuesta" => "Juego actualizado con exito"], 200);
        }
        else{
            return response()->json(["respuesta" => "Este juego no te pertenece"], 403);
        }

        return response()->json(["respuesta" => "No tienes permiso para actializar este juego"], 403);

    }

    public function buscarPorNombreJuego(String $nombreJuego){
        
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
