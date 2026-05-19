<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $model = 'gemini-2.5-flash-preview-04-17';
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key', '');
    }

    /**
     * Ask Gemini to generate $count multiple-choice general knowledge questions.
     * Returns an array of question arrays ready to be inserted into the DB.
     */
    public function generateQuestions(int $count = 3, string $date = ''): array
    {
        if (empty($this->apiKey)) {
            Log::error('GeminiService: GEMINI_API_KEY is not set.');
            return [];
        }

        $scheduledDate = $date ?: now()->toDateString();

        $prompt = <<<PROMPT
Today's date is {$scheduledDate}. Generate exactly {$count} EASY multiple-choice general knowledge quiz questions specifically for this date.

IMPORTANT: These questions must be UNIQUE to {$scheduledDate}. Do NOT reuse or repeat questions from any previous day. Use the date as a creative seed — you may reference seasons, upcoming events, history, or anything topically varied for that specific day.

Each question must be simple, engaging, educational, and suitable for a casual daily trivia game (think: science, history, geography, pop culture, food, sports, animals, technology). The difficulty level must be EASY highschool level general knowledge.
If you generate a history or geography question, it MUST be specifically in a Philippine context (e.g., Philippine history, Philippine geography, Filipino culture).

Vary the categories — do NOT repeat the same category twice in this set.

Return ONLY a valid JSON array with no extra text, markdown, or code fences. Use this exact structure:
[
  {
    "prompt": "Full question text here?",
    "options": {
      "A": "First option",
      "B": "Second option",
      "C": "Third option",
      "D": "Fourth option"
    },
    "correct_answer": "B",
    "fun_fact": "A fascinating 1-sentence fun fact about the correct answer.",
    "category": "Category Name"
  }
]

Rules:
- Each question must have exactly 4 options (A, B, C, D).
- correct_answer must be one of: A, B, C, or D.
- Questions must be fresh and varied — never the same as yesterday's or last week's.
- No duplicate questions within this set.
- Output only the raw JSON array, nothing else.
PROMPT;

        $url = "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}";

        // Path to the CA bundle — needed on Windows where PHP's curl may lack system certs
        $caBundle = base_path('cacert.pem');

        try {
            $response = Http::timeout(30)
                ->withOptions(file_exists($caBundle) ? ['verify' => $caBundle] : [])
                ->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt],
                        ],
                    ],
                ],
                'generationConfig' => [
                    'temperature'     => 0.9,
                ],
            ]);

            if (! $response->successful()) {
                Log::error('GeminiService: API request failed.', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                return [];
            }

            $text = data_get($response->json(), 'candidates.0.content.parts.0.text', '');

            // Strip any accidental markdown fences
            $text = trim(preg_replace('/^```(?:json)?\s*/i', '', $text));
            $text = preg_replace('/\s*```$/', '', $text);

            $questions = json_decode($text, true);

            if (! is_array($questions)) {
                Log::error('GeminiService: Failed to parse JSON response.', ['raw' => $text]);
                return [];
            }

            return array_map(fn($q) => [
                'prompt'         => trim($q['prompt'] ?? ''),
                'options'        => $q['options'] ?? [],
                'correct_answer' => strtoupper(trim($q['correct_answer'] ?? 'A')),
                'fun_fact'       => trim($q['fun_fact'] ?? ''),
                'category'       => trim($q['category'] ?? 'General'),
                'scheduled_for'  => $scheduledDate,
            ], $questions);

        } catch (\Throwable $e) {
            Log::error('GeminiService: Exception during API call.', ['error' => $e->getMessage()]);
            return [];
        }
    }
}
