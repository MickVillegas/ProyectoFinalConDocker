<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

Route::get('/users', [userController::class, 'obtenerUsuarios']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
