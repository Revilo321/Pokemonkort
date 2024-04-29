<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemoncard;

class PokemonController extends Controller
{
    public function index()
    {
        $pokemoncard = Pokemoncard::all();
        return response()->json([
            "pokemoncard" => $pokemoncard
        ], 200);
    }

    public function store(Request $request)
    {
        $pokemoncard = Pokemoncard::create(
            $request->toArray()
        );

        if (!is_null($pokemoncard)) {
            $msg = 'Card added';
        } else {
            $msg = 'Could not add card';
        }

        return response()->json(
            [
                "msg" => $msg,
                "pokemoncard" => $pokemoncard
            ],
            200
        );
    }

    public function complete(Request $request)
    {
        $pokemoncard = Pokemoncard::whereId($request->id)->first();
        if(!is_null($pokemoncard)){
            $pokemoncard->completed = !$pokemoncard->completed;
            $pokemoncard->save();
        }
        $pokemoncard_changed = Pokemoncard::whereId($request->id)->first();
        return response()->json(
            $pokemoncard_changed, 200
        );
    }
    public function delete(Request $request)
    {
        $message = 'Card not found';
        $pokemoncard = Pokemoncard::whereId($request->id)->first();
        if(!is_null($pokemoncard)){
            $pokemoncard->delete();
            $message = 'Card deleted';
        }
        return response()->json(
            $message, 200
        );
    }
}
