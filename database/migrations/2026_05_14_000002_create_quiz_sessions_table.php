<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('question_id')->constrained()->cascadeOnDelete();
            $table->string('submitted_answer')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('score')->default(0);        // points earned
            $table->integer('time_taken')->default(0);   // seconds
            $table->date('session_date')->index();       // the calendar day
            $table->timestamps();

            $table->unique(['user_id', 'session_date']); // one attempt per day
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_sessions');
    }
};
