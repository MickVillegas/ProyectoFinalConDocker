<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    // 👇 Esta línea evita que Eloquent intente usar created_at y updated_at
    public $timestamps = false;

    protected $fillable = [
        'nombre_usuario',
        'apellidos',
        'edad',
        'username',
        'password',
        'billetera',
        'rol',
        'email',
        'descripcion'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function games()
    {
        return $this->belongsToMany(Game::class, 'libraries', 'id_user', 'id_game');
    }

    public function juegosDesarrollados()
{
    return $this->hasMany(Game::class, 'id_usuario_publicador');
}

    public function isAdmin() {
        return $this->rol === 'admin';
    }

    public function isVendedor() {
        return $this->rol === 'vendedor';
    }

    public function isComprador() {
        return $this->rol === 'comprador';
    }

    public function cart() {
        return $this->hasMany(Cart::class);
    }

    public function libraries(){
        return $this->hasMany(Library::class, 'id_user');
    }
}