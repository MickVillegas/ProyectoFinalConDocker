<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \App\Models\User;
use \App\Models\Cart;

class cartController extends Controller
{
    public function obtenerCarrito(String $idUsuario){

        $carrito = Cart::where("id_usuario_comprador", $idUsuario)->paginate();

        if($carrito->isEmpty()){
            return response()->json(["respuesta" => "Carrito no encontrado"], 404);
        }

        return response()->json($carrito);
    }

    public function borrarCarrito(String $idUsuario){
        $filasBorradas = Cart::where('id_usuario_comprador', $idUsuario)->delete();

        if($filasBorradas === 0){
            return response()->json(["respuesta" => "No se encontraron items para borrar"], 404);
        }

        return response()->json(["respuesta" => "Carrito del usuario borrado"], 200);
    }

    public function subirCarritoNuevo(Request $req){
        Cart::create(['nombre_juegp' => $req->nombre_juegp, 'precio_juego' => $req->precio_juego, 'id_juego' => $req->id_juego, 'idUsuarioVendedor' => $req->idUsuarioVendedor, 'id_usuario_comprador' => $req->id_usuario_comprador]);
        return response()->json(["respuesta" => "Usuario nuevo publicado con exito"], 200);
    }
}
