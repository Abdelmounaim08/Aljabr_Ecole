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
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description");
            $table->text("image");
            $table->text('adress');
            $table->string('mail')->unique()->nullable();
            $table->string('contact');
            $table->string('sitweb')->nullable();
            $table->string('reseaux')->nullable();
            $table->string('nameAdmin');
            $table->string('emailAdmin')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
