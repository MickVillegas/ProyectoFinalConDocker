<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Game;
use \App\Models\User;
use \App\Models\Library;



class BibliotecaController extends Controller{

    public function obtenerJuegosUsuario($idUsuario, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $usuario = User::findOrFail($idUsuario);

        $juegosPaginados = $usuario->games()
            ->orderBy('id_juego', 'DESC')
            ->paginate(10);

        return response()->json($juegosPaginados);
    }

    public function subirJuegoALaBiblioteca(Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }
        
        $req->validate([
            'id_user' => 'required|string',
            'id_game' => 'required|string',
        ]);

        Library::create(["id_user" => $req->id_user, "id_game" => $req->id_game]);
        return response()->json(["rep" => "Juego nuevo guardado con exito"], 200);

    }
}
