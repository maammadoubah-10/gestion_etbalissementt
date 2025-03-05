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
        Schema::create('emplois', function (Blueprint $table) {
            $table->id();
            $table->string('jour'); // Exemple : Lundi, Mardi...
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->string('salle');
            $table->unsignedBigInteger('professeur_id'); // ID du professeur récupéré depuis ms-professeurs
            $table->unsignedBigInteger('cours_id'); // ID du cours récupéré depuis ms-cours
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emplois');
    }
};
