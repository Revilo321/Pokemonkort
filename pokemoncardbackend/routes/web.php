<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;


header('Access-Control-Allow-Origin: *');
//Access-Control-Allow-Origin: *
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//add the following lines
Route::get('pokemoncard', [PokemonController::class, 'index']);
Route::post('pokemoncards', [PokemonController::class, 'store']);
Route::post('pokemoncard/delete', [PokemonController::class, 'delete']);
Route::post('pokemoncard/update', [PokemonController::class, 'complete']);
