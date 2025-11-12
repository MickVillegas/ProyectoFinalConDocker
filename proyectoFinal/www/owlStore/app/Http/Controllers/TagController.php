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

    public function borrarTag(String $id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $etiqueta = Tag::where('id', $id)->first();
        
        if(!$etiqueta){
            return response()->json(["respuesta" => "Etiqueta no encontrada"], 404);
        }

        $etiqueta->delete();
        return response()->json(["respuesta" => "Etiqueta borrado con exito"], 200);
    }

   public function publicarTag(Request $req){
    $user = $req->user();

    if (!$user) {
        return response()->json(["respuesta" => "No estás autenticado."], 401);
    }

    // ✅ Validación con mensaje personalizado
    $req->validate([
        'nombre_etiqueta' => 'required|string|max:255',
    ], [
        'nombre_etiqueta.required' => 'El nombre de la etiqueta es obligatorio.',
        'nombre_etiqueta.string' => 'El nombre de la etiqueta debe ser un texto válido.',
        'nombre_etiqueta.max' => 'El nombre de la etiqueta no puede tener más de 255 caracteres.',
    ]);

    Tag::create(["nombre_etiqueta" => $req->nombre_etiqueta]);
    return response()->json(["respuesta" => "Etiqueta nueva publicada con éxito"], 200);
}

}
