<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsuariosController extends Controller
{
    
    public function obtenerUsuarios(Request $req){
        $user = $req->user();
        
        if($user->rol == "admin"){

            $usuarios = User::orderBy("id", "ASC")->paginate();

            if($usuarios->isempty()){
                return response()->json(["respuesta" => "No hay usuarios en la lista, añade un usuario a la lista"], 404);
            }

            return response()->json($usuarios);

        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);

    }

    public function obtenerUnUsuario(string $id, Request $req){
        $user = $req->user();

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        if($user->rol == "admin"){
            return response()->json($unUsuario);
        }

        if($user->id == $id){
             return response()->json($unUsuario);
        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);
        
    }

    public function borrarUsuario(string $id, Request $req){
        $user = $req->user();

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        if($user->id == $id || $user->rol == "admin"){

            $unUsuario->delete();
            return response()->json(["respuesta" => "Usuario borrado con exito"], 200);

        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);
    }

    public function subirUsuario(Request $req){

        $username = User::where("username", $req->username)->first();

        if(!$username){
            User::create(['nombre_usuario' => $req->nombre_usuario, 'apellidos' => $req->apellidos, 'edad' => $req->edad, 'username' => $req->username, 'password' => Hash::make($req->password), 'billetera' => $req->billetera, 'rol' => $req->rol, 'email' => $req->email, 'descripcion' => $req->descripcion]);
            return response()->json(["respuesta" => "Usuario nuevo publicado con exito"], 200);
        }
        else{
            return response()->json(['mensaje' => "Ese nombre de usuario es usado por otro usuario, puebe uno nuevo"], 409);
        }

    }

    public function actualizarUsuario(string $id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No autenticado"], 401);
        }

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        if($user->id == $id || $user->rol == "admin"){

            $unUsuario->nombre_usuario = $req->nombre_usuario;
            $unUsuario->apellidos = $req->apellidos;
            $unUsuario->edad = $req->edad;
            $unUsuario->username = $req->username; 
            
            if ($req->filled('password')) {
                $unUsuario->password = Hash::make($req->password);
            }
            $unUsuario->billetera = $req->billetera; 
            $unUsuario->rol = $req->rol; 
            $unUsuario->email = $req->email;
            $unUsuario->descripcion = $req->descripcion;
    
            $unUsuario->save();

            return response()->json(["respuesta" => "Usuario actualizado con exito"], 200);

        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);

    }

    public function buscarPorNombreUusario(String $nombreUsuario){
        
        $usuarios = User::where('username', 'LIKE', "%{$nombreUsuario}%")->get();

        if(!$usuarios){
            return response()->json(["respuesta" => "No exsisten coincidencias con el nombre " .$usuarios], 404);
        }

        return response()->json($usuarios);
    }

    public function actualizarBilleteraUsuario(string $id, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No autenticado"], 401);
        }

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        if($user->id == $id){

            $unUsuario->billetera = number_format((float) $req->billetera, 2, '.', ''); 
            $unUsuario->save();

            return response()->json(["respuesta" => "Usuario actualizado con exito"], 200);

        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);

    }

    public function recibirDineroJuegoComprado(String $id, String $precio, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["rep" => "No autenticado"], 401);
        }

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["rep" => "No exsiste un usuario con id " .$id], 404);
        }

        $suma = intval($unUsuario->billetera) + intval($precio);

        $unUsuario->billetera = $suma; 
        $unUsuario->save();

        return response()->json(["respuesta" => "Dinero añadido correctamente"], 200);
    }
}

