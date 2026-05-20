<?php

namespace App\Http\Controllers;

use App\Models\QuizSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Top 10 by cumulative score — deleted users automatically excluded
        $leaderboard = QuizSession::has('user')
            ->selectRaw('user_id, SUM(score) as total_score, COUNT(*) as total_attempts')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->with('user:id,name')
            ->limit(10)
            ->get()
            ->values()
            ->map(fn($row, $i) => [
                'rank'   => $i + 1,
                'name'   => $row->user->name ?? 'Unknown',
                'points' => (int) $row->total_score,
                'total'  => (int) $row->total_attempts,
            ]);

        // Current user's global rank
        $allRanked = QuizSession::has('user')
            ->selectRaw('user_id, SUM(score) as total_score')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->pluck('user_id')
            ->toArray();

        $userRank       = ($pos = array_search($user->id, $allRanked)) !== false ? $pos + 1 : null;
        $userTotalScore = (int) QuizSession::where('user_id', $user->id)->sum('score');

        return Inertia::render('Leaderboard', [
            'leaderboard'    => $leaderboard,
            'userRank'       => $userRank,
            'userTotalScore' => $userTotalScore,
        ]);
    }
}
