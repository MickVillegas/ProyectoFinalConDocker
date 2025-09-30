<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->string("nombre_juegp");
            $table->string("precio_juego");
            $table->string("id_juego");
            $table->string("idUsuarioVendedor");
            $table->unsignedBigInteger('id_usuario_comprador'); 
            $table->foreign('id_usuario_comprador')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
