<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('prompt');
            $table->json('options');          // ["A", "B", "C", "D"]
            $table->string('correct_answer'); // e.g. "B"
            $table->string('category')->default('General');
            $table->date('scheduled_for')->nullable()->index(); // NULL = unscheduled
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
