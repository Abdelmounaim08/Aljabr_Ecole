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
        Schema::table('ecoles', function (Blueprint $table) {
            $table->text('adress');
            $table->string('mail')->unique()->nullable();
            $table->string('contact');
            $table->string('sitweb')->nullable();
            $table->string('reseaux')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ecoles', function (Blueprint $table) {
            $table->dropColumn(['adress', 'mail', 'contact', 'sitweb', 'reseaux']);
        });
    }
};
