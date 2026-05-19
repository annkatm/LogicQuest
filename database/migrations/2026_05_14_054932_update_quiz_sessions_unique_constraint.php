<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quiz_sessions', function (Blueprint $table) {
            // Add a plain index on user_id first, so the foreign key constraint
            // has a backing index when we drop the composite unique below.
            $table->index('user_id', 'quiz_sessions_user_id_fk_index');

            // Drop the old (user_id, session_date) unique — one attempt per day
            $table->dropUnique(['user_id', 'session_date']);

            // Replace with (user_id, question_id) — one attempt per question
            // so a user can answer all 3 daily questions independently
            $table->unique(['user_id', 'question_id']);
        });
    }

    public function down(): void
    {
        Schema::table('quiz_sessions', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'question_id']);
            $table->unique(['user_id', 'session_date']);
            $table->dropIndex('quiz_sessions_user_id_fk_index');
        });
    }
};
