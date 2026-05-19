<?php

namespace App\Console\Commands;

use App\Models\Question;
use App\Services\GeminiService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class GenerateDailyQuestions extends Command
{
    protected $signature = 'questions:generate-daily
                            {--date= : The date to schedule questions for (Y-m-d). Defaults to today.}
                            {--count=3 : Number of questions to generate.}';

    protected $description = 'Generate daily quiz questions via the Gemini AI API and store them in the database.';

    public function __construct(protected GeminiService $gemini)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $date  = $this->option('date') ?: now()->toDateString();
        $count = (int) $this->option('count');

        // Avoid generating twice for the same day
        $existing = Question::where('scheduled_for', $date)->count();
        if ($existing >= $count) {
            $this->info("✓ {$existing} questions already exist for {$date} — skipping.");
            return self::SUCCESS;
        }

        $needed = $count - $existing;
        $this->info("Generating {$needed} question(s) for {$date} via Gemini…");

        $questions = $this->gemini->generateQuestions($needed, $date);

        if (empty($questions)) {
            $this->error('Gemini returned no questions. Check logs for details.');
            return self::FAILURE;
        }

        $saved = 0;
        foreach ($questions as $q) {
            if (empty($q['prompt'])) continue;

            Question::create([
                'prompt'         => $q['prompt'],
                'options'        => $q['options'],
                'correct_answer' => $q['correct_answer'],
                'fun_fact'       => $q['fun_fact'],
                'category'       => $q['category'],
                'scheduled_for'  => $q['scheduled_for'],
            ]);

            $this->line("  ✔ [{$q['category']}] {$q['prompt']}");
            $saved++;
        }

        $this->info("Done — {$saved} question(s) saved for {$date}.");
        Log::info("GenerateDailyQuestions: {$saved} question(s) generated for {$date}.");

        return self::SUCCESS;
    }
}
