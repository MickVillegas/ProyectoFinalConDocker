<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 

class userController extends Controller
{
        public function obtenerUsuarios(){

            $usuarios = User::orderBy("id", "ASC")->paginate();

            if($usuarios->isempty()){
                return response()->json(["respuesta" => "No hay usuarios en la lista, añade un usuario a la lista"], 404);
            }

            return response()->json($usuarios);
    }
}
