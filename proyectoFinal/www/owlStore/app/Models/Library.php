<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
    /** @use HasFactory<\Database\Factories\LibraryFactory> */
    use HasFactory;

        protected $fillable = [
        'id_user',
        'id_game',
    ];
public $timestamps = false; // <--- importante
}
