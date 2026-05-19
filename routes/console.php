<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Generate 3 daily questions every day at midnight
Schedule::command('questions:generate-daily --count=3')
    ->dailyAt('00:00')
    ->withoutOverlapping()
    ->runInBackground();
