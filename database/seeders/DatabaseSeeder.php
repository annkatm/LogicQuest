<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Ann Curtis',
                'password' => Hash::make('password'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'tylercoastcervando@gmail.com'],
            [
                'name' => 'Tyler Coast',
                'password' => Hash::make('iloveyoujasver143'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'ivankarllobaton@gmail.com'],
            [
                'name' => 'Karl Lobaton',
                'password' => Hash::make('88888888'),
            ]
        );

        // User::factory(10)->create();

        $this->call(QuestionSeeder::class);
    }
}