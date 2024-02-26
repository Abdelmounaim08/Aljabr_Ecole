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
        Schema::table('Eleves', function (Blueprint $table) {
            $table->unsignedBigInteger('niveau_id')->nullable();
            $table->foreign('niveau_id')->references('id')->on('Niveaux');
            $table->dropColumn('Niveau');
            $table->unsignedBigInteger('class_id')->nullable();
            $table->foreign('class_id')->references('id')->on('classes');
            $table->dropColumn('class');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Eleves', function (Blueprint $table) {
            Schema::table('Eleves', function (Blueprint $table) {
                $table->dropForeign(['niveau_id']);
                $table->dropColumn('niveau_id');
                $table->string('Niveau');
                $table->dropForeign(['class_id']);
                $table->dropColumn('class_id');
                $table->string('class');
            });
        });
    }
};
