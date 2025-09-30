<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    
    public function obtenerEtiquetas(){
        $etiquetas = Tag::orderBy('id', 'DESC')->paginate();

        return response()->json($etiquetas);
    }

    public function borrarTag(String $id){
        $etiqueta = Tag::where('id', $id)->first();
        
        if(!$etiqueta){
            return response()->json(["respuesta" => "Etiqueta no encontrada"], 404);
        }

        $etiqueta->delete();
        return response()->json(["respuesta" => "Etiqueta borrado con exito"], 200);
    }

    public function publicarTag(Request $req){
        Tag::create(["nombre_etiqueta" => $req->nombre_etiqueta]);
        return response()->json(["respuesta" => "Etiqueta nueva publicada con exito"], 200);
    }

}
