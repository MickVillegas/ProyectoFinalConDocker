<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{

    public $timestamps = false;

    protected $fillable = [
        'nombre_juegp',
        'precio_juego',
        'id_juego',
        'idUsuarioVendedor',
        'id_usuario_comprador',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    /** @use HasFactory<\Database\Factories\CartFactory> */
    use HasFactory;
}
