<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'prompt',
        'options',
        'correct_answer',
        'fun_fact',
        'category',
        'scheduled_for',
    ];

    protected $casts = [
        'options'       => 'array',
        'scheduled_for' => 'date',
    ];

    /**
     * Return all questions scheduled for today (up to $limit).
     * Falls back to random unscheduled questions if the day has no scheduled ones.
     * Order is NOT shuffled — use forUser() to get per-user shuffled order.
     */
    public static function todaysQuestions(int $limit = 3): \Illuminate\Database\Eloquent\Collection
    {
        $today     = now()->toDateString();
        $scheduled = static::where('scheduled_for', $today)->limit($limit)->get();

        if ($scheduled->count() >= $limit) {
            return $scheduled;
        }

        // Fallback: fill up with random unscheduled questions not already included
        $existing = $scheduled->pluck('id');
        $needed   = $limit - $scheduled->count();
        $fallback = static::whereNull('scheduled_for')
            ->whereNotIn('id', $existing)
            ->inRandomOrder()
            ->limit($needed)
            ->get();

        return $scheduled->concat($fallback);
    }

    /**
     * Return today's $limit questions in a per-user shuffled order.
     *
     * The shuffle is deterministic: same user on the same day always gets
     * the same order, but different users see a different sequence.
     * Seed = (user_id * 31 + date-as-integer) mod PHP_INT_MAX
     */
    public static function forUser(int $userId, int $limit = 3): \Illuminate\Database\Eloquent\Collection
    {
        $questions = static::todaysQuestions($limit);

        // Build a deterministic seed from user_id + today's date digits (e.g. 20260518)
        $dateSeed = (int) str_replace('-', '', now()->toDateString()); // e.g. 20260518
        $seed     = ($userId * 31 + $dateSeed) % PHP_INT_MAX;

        // Seeded Fisher-Yates shuffle on the collection items
        $items = $questions->values()->all();
        $count = count($items);

        mt_srand($seed);
        for ($i = $count - 1; $i > 0; $i--) {
            $j = mt_rand(0, $i);
            [$items[$i], $items[$j]] = [$items[$j], $items[$i]];
        }
        // Reset mt_rand seed so it does not affect anything else
        mt_srand();

        return new \Illuminate\Database\Eloquent\Collection($items);
    }

    public function sessions()
    {
        return $this->hasMany(QuizSession::class);
    }
}
