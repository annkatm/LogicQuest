<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuizSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the authenticated dashboard with today's 3 questions.
     */
    public function index(Request $request)
    {
        $user  = $request->user();
        $today = now()->toDateString();

        // --- Today's 3 questions, shuffled in a user-specific order ---
        $todaysQuestions = Question::forUser($user->id, 3);

        // --- Which question IDs has this user already answered today? ---
        $answeredIds = QuizSession::where('user_id', $user->id)
            ->where('session_date', $today)
            ->pluck('question_id')
            ->toArray();

        // --- Build the questions payload (never expose correct_answer) ---
        $questionsData = $todaysQuestions->map(fn($q) => [
            'id'       => $q->id,
            'prompt'   => $q->prompt,
            'options'  => $q->options,
            'category' => $q->category,
            'answered' => in_array($q->id, $answeredIds),
        ])->values();

        // --- Completed sessions for today (to show result feedback) ---
        $sessions = QuizSession::where('user_id', $user->id)
            ->where('session_date', $today)
            ->with('question:id,correct_answer,fun_fact')
            ->get()
            ->keyBy('question_id')
            ->map(fn($s) => [
                'submitted_answer' => $s->submitted_answer,
                'is_correct'       => $s->is_correct,
                'score'            => $s->score,
                'correct_answer'   => $s->question->correct_answer,
                'fun_fact'         => $s->question->fun_fact,
            ]);

        // --- Leaderboard: top 10 by cumulative score ---
        $leaderboard = QuizSession::has('user')
            ->selectRaw('user_id, SUM(score) as total_score, COUNT(*) as total_attempts')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->with('user:id,name')
            ->limit(10)
            ->get()
            ->map(fn($row, $i) => [
                'rank'   => $i + 1,
                'name'   => $row->user->name ?? 'Unknown',
                'points' => (int) $row->total_score,
                'total'  => (int) $row->total_attempts,
            ]);

        // --- Current user stats ---
        $allRanked      = QuizSession::has('user')
            ->selectRaw('user_id, SUM(score) as total_score')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->pluck('user_id')
            ->toArray();
        $userRank       = ($p = array_search($user->id, $allRanked)) !== false ? $p + 1 : null;
        $userTotalScore = (int) QuizSession::where('user_id', $user->id)->sum('score');

        return Inertia::render('Dashboard', [
            'questions'      => $questionsData,
            'sessions'       => $sessions,             // keyed by question_id
            'leaderboard'    => $leaderboard,
            'userRank'       => $userRank,
            'userTotalScore' => $userTotalScore,
        ]);
    }

    /**
     * Submit the user's answer for one of today's questions.
     */
    public function submit(Request $request)
    {
        $request->validate([
            'question_id' => 'required|exists:questions,id',
            'answer'      => 'required|string|max:1',
            'time_taken'  => 'required|integer|min:0|max:3600',
        ]);

        $user  = $request->user();
        $today = now()->toDateString();

        // Prevent duplicate submissions per question
        $alreadyAnswered = QuizSession::where('user_id', $user->id)
            ->where('question_id', $request->question_id)
            ->exists();

        if ($alreadyAnswered) {
            return back()->withErrors(['message' => 'You have already answered this question.']);
        }

        $question  = Question::findOrFail($request->question_id);
        $isCorrect = strtoupper(trim($request->answer)) === strtoupper(trim($question->correct_answer));

        // Linear time-decay scoring: 100 pts at 0 s → 10 pts at 60 s
        $timeTaken = (int) $request->time_taken;
        $score     = $isCorrect ? max(10, 100 - (int) (($timeTaken / 60) * 90)) : 0;

        QuizSession::create([
            'user_id'          => $user->id,
            'question_id'      => $question->id,
            'submitted_answer' => strtoupper(trim($request->answer)),
            'is_correct'       => $isCorrect,
            'score'            => $score,
            'time_taken'       => $timeTaken,
            'session_date'     => $today,
        ]);

        return back();
    }
}
