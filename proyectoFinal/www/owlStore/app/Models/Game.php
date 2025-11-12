<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    public $timestamps = false;

        protected $primaryKey = 'id_juego';
       
        protected $fillable = [
            'nombre_juego',
            'fecha_salida',
            'precio',
            'genero',
            'pegi',
            'descripcion',
            'id_usuario_publicador',
    ];

     protected $guarded = ['ventas'];

    public function users(){
        return $this->belongsToMany(Usuario::class, 'libraries', 'id_game', 'id_user');
    }

    public function libraries(){
        return $this->hasMany(Library::class, 'id_game', 'id_juego');
    }
}
