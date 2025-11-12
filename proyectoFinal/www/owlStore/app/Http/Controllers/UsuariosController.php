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

        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }
        
        if($user->rol == "admin"){

            $usuarios = User::orderBy("id", "ASC")->paginate();

            if($usuarios->isempty()){
                return response()->json(["respuesta" => "No hay usuarios en la lista, añade un usuario a la lista"], 404);
            }

            return response()->json($usuarios);

        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);

    }

    public function obtenerUnUsuario(string $id){

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        return response()->json($unUsuario);
        
    }

    public function borrarUsuario(string $id, Request $req){
        $user = $req->user();
        
        if (!$user) {
            return response()->json(["respuesta" => "No estás autenticado."], 401);
        }

        $unUsuario = User::where("id", $id)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        if($user->id == $id || $user->rol == "admin"){

            $unUsuario->delete();
            return response()->json(["respuesta" => "Usuario borrado con exito"], 200);

        }

        return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);
    }

    public function subirUsuario(Request $req){

        $req->validate([
            'nombre_usuario' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer|min:1',
            'username' => 'required|string|unique:users,username,',
            'email' => 'required|email|unique:users,email,',
            'password' => 'nullable|string|min:6',
        ], [
            'nombre_usuario.required' => 'El campo nombre del usuario es obligatorio.',
            'apellidos.required' => 'El campo apellidos es obligatorio.',
            'edad.required' => 'El campo edad es obligatorio.',
            'edad.integer' => 'La edad debe ser un número entero.',
            'edad.min' => 'La edad debe ser mayor que 0.',
            'username.required' => 'El campo nombre de usuario es obligatorio.',
            'username.unique' => 'El nombre de usuario ya está en uso.',
            'email.required' => 'El campo email es obligatorio.',
            'email.email' => 'El email no tiene un formato válido.',
            'email.unique' => 'El email ya está en uso.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
        ]);

        $username = User::where("username", $req->username)->first();

        if(!$username){
            User::create(['nombre_usuario' => $req->nombre_usuario, 'apellidos' => $req->apellidos, 'edad' => $req->edad, 'username' => $req->username, 'password' => Hash::make($req->password), 'billetera' => $req->billetera, 'rol' => $req->rol, 'email' => $req->email, 'descripcion' => $req->descripcion]);
            return response()->json(["respuesta" => "Usuario nuevo publicado con exito"], 200);
        }
        else{
            return response()->json(['mensaje' => "Ese nombre de usuario es usado por otro usuario, puebe uno nuevo"], 409);
        }

    }

public function actualizarUsuario(string $id, Request $req)
{
    $user = $req->user();

    if (!$user) {
        return response()->json(["respuesta" => "No autenticado"], 401);
    }

    $unUsuario = User::find($id);

    if (!$unUsuario) {
        return response()->json(["respuesta" => "No existe un usuario con id " . $id], 404);
    }

    if ($user->id == $id || $user->rol == "admin") {

        // ✅ Validar datos
        $req->validate([
            'nombre_usuario' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer|min:1',
            'username' => 'required|string|unique:users,username,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
        ], [
            'nombre_usuario.required' => 'El campo nombre del usuario es obligatorio.',
            'apellidos.required' => 'El campo apellidos es obligatorio.',
            'edad.required' => 'El campo edad es obligatorio.',
            'edad.integer' => 'La edad debe ser un número entero.',
            'edad.min' => 'La edad debe ser mayor que 0.',
            'username.required' => 'El campo nombre de usuario es obligatorio.',
            'username.unique' => 'El nombre de usuario ya está en uso.',
            'email.required' => 'El campo email es obligatorio.',
            'email.email' => 'El email no tiene un formato válido.',
            'email.unique' => 'El email ya está en uso.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
        ]);

        // ✅ Actualizar
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

        return response()->json(["respuesta" => "Usuario actualizado con éxito"], 200);
    }

    return response()->json(["respuesta" => "No tienes permiso para hacer esto"], 403);
}

    public function buscarPorNombreUusario(String $nombreUsuario, Request $req){
        $user = $req->user();

        if (!$user) {
            return response()->json(["respuesta" => "No autenticado"], 401);
        }
        
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

    
    public function cambiarContraseña(string $email, Request $req){

        $unUsuario = User::where("email", $email)->first();

        if(!$unUsuario){
            return response()->json(["respuesta" => "No exsiste un usuario con id " .$id], 404);
        }

        $unUsuario->password = Hash::make($req->password);
        $unUsuario->save();
        return response()->json(["respuesta" => "Contraseña actualizada con exito"], 200);
    }
}

