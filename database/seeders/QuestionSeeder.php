<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $today = now()->toDateString();

        // 3 questions scheduled for today (serves as offline fallback before Gemini is configured)
        $questions = [
            [
                'prompt'         => 'Which data structure uses LIFO (Last In, First Out) order?',
                'options'        => ['A' => 'Queue', 'B' => 'Stack', 'C' => 'Linked List', 'D' => 'Tree'],
                'correct_answer' => 'B',
                'category'       => 'Data Structures',
                'scheduled_for'  => $today,
            ],
            [
                'prompt'         => 'What does the Big-O notation O(1) represent?',
                'options'        => ['A' => 'Linear time', 'B' => 'Logarithmic time', 'C' => 'Constant time', 'D' => 'Quadratic time'],
                'correct_answer' => 'C',
                'category'       => 'Algorithms',
                'scheduled_for'  => $today,
            ],
            [
                'prompt'         => 'Which SQL keyword removes duplicate rows from a result set?',
                'options'        => ['A' => 'UNIQUE', 'B' => 'DISTINCT', 'C' => 'FILTER', 'D' => 'EXCLUDE'],
                'correct_answer' => 'B',
                'category'       => 'Databases',
                'scheduled_for'  => $today,
            ],
            // Extra unscheduled questions used as fallback on days with no AI-generated ones
            [
                'prompt'         => 'In object-oriented programming, what is encapsulation?',
                'options'        => ['A' => 'Inheriting from a parent class', 'B' => 'Bundling data and methods that operate on that data', 'C' => 'Defining multiple methods with the same name', 'D' => 'Converting one data type to another'],
                'correct_answer' => 'B',
                'category'       => 'OOP',
                'scheduled_for'  => null,
            ],
            [
                'prompt'         => 'What HTTP status code represents "Not Found"?',
                'options'        => ['A' => '200', 'B' => '301', 'C' => '403', 'D' => '404'],
                'correct_answer' => 'D',
                'category'       => 'Web',
                'scheduled_for'  => null,
            ],
        ];

        foreach ($questions as $q) {
            Question::firstOrCreate(['prompt' => $q['prompt']], $q);
        }
    }
}
