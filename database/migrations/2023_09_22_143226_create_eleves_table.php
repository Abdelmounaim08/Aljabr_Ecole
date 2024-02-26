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
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("prenom");
            $table->string("CIN");
            $table->string("Massar");
            $table->Date("dateNaissance");
            $table->unsignedBigInteger('id_ecole');
            $table->foreign('id_ecole')->references('id')->on('ecoles');
            $table->string("email")->unique();
            $table->string("class");            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves');
    }
};
