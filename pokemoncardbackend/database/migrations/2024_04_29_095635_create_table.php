<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pokemoncards', function (Blueprint $table) {
            $table->increments('pokemon_id');
            $table->string('name');
            $table->string('description');
            $table->integer('price');
            $table->string('image');
            $table->string('type');
            $table->integer('rarity');
            $table->string('set');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokemoncards');
    }
};
