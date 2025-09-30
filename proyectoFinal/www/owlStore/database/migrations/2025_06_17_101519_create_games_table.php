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
        Schema::create('games', function (Blueprint $table) {
            $table->id('id_juego');
            $table->string('nombre_juego');
            $table->string('fecha_salida');
            $table->string('precio', 10, 2);
            $table->string('genero');
            $table->string('pegi');
            $table->string('ventas')->default(0);
            $table->string('descripcion');
            $table->unsignedBigInteger('id_usuario_publicador'); 
            $table->foreign('id_usuario_publicador')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
