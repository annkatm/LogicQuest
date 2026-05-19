# LogicQuest

Engage Your Logic. Master the Quest.

LogicQuest is a daily, interactive trivia and engagement web application built with Laravel 11, React, Inertia.js, and Tailwind CSS. It challenges users with three AI-generated questions every day, tracks their response times to calculate scores, and maintains a real-time competitive leaderboard.

---

## Features

- AI-Powered Daily Challenges: Automatically generates three fresh, unique, and accessible multiple-choice questions every day using the Google Gemini AI API.
- Educational "Did You Know?" Insights: After answering, users are presented with a fascinating, AI-generated fun fact related to the question to enhance micro-learning.
- Time-Decay Scoring Engine: A dynamic scoring system that awards a maximum of 100 points for a correct answer, slowly decaying linearly down to a minimum of 10 points over 60 seconds. Speed and accuracy both matter!
- Sleek, Dynamic UI: A modern, immersive dark-mode interface featuring glassmorphism elements, micro-animations, background ambient glows, and interactive state changes.
- Real-Time Leaderboard: Compete against colleagues or friends. The dashboard automatically ranks users based on their cumulative lifetime score and attempt count, and dynamically filters out deleted users to ensure accuracy.
- Single Page Application (SPA): Lightning-fast, seamless navigation powered by Inertia.js—no full page reloads required.

## Tech Stack

- Backend: PHP 8.2+, Laravel 11
- Frontend: React 18, Inertia.js, Tailwind CSS v3
- Database: MySQL / SQLite
- AI Integration: Google Gemini 2.5 Flash API (Free Tier)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- PHP >= 8.2
- Composer
- Node.js & npm
- A free [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository (if applicable) and navigate to the project directory:
   ```bash
   cd LogicQuest
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Environment Setup:
   Copy the example `.env` file to create your own configuration:
   ```bash
   cp .env.example .env
   ```
   Generate the application key:
   ```bash
   php artisan key:generate
   ```

5. Configure the Gemini AI API:
   Open your `.env` file and add your Google Gemini API key at the bottom:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

6. Database Migration and Seeding:
   Run the database migrations and populate the database with default users and fallback questions:
   ```bash
   php artisan migrate --seed
   ```
   *(Note: The seeder creates three sample users for testing, including `admin@example.com` / `password`)*.

### Running the Application

To run the application locally, you will need two terminal windows running simultaneously.

Terminal 1 — Run the Laravel local development server:
```bash
php artisan serve
```

Terminal 2 — Run the Vite development server (for React/Tailwind assets):
```bash
npm run dev
```

Visit `http://127.0.0.1:8000` in your browser. Log in or register an account to access the dashboard.

---

## Generating AI Questions

LogicQuest relies on an Artisan command to fetch questions from the Gemini API.

Generate questions manually:
```bash
php artisan questions:generate-daily
```
By default, this generates 3 questions for the current date. 

You can also backfill or generate questions for a specific future date:
```bash
php artisan questions:generate-daily --count=3 --date=2026-05-15
```

### Automation (Cron Schedule)
In a production environment, you don't need to run this manually. The command is scheduled in `routes/console.php` to run every night at midnight. 
To activate the scheduler, ensure your server is running the Laravel schedule worker:
```bash
php artisan schedule:work
```

---

## Key Architecture Overview

- `app/Services/GeminiService.php`: Handles the communication with the Google Gemini API, sending custom prompts and cleanly parsing the JSON response.
- `app/Console/Commands/GenerateDailyQuestions.php`: The Artisan command that ties the GeminiService to the database, ensuring no duplicate generations happen for a single day.
- `app/Http/Controllers/DashboardController.php`: The core logic resolving the active questions for the day, scoring submissions, and aggregating the leaderboard.
- `resources/js/Pages/Dashboard.jsx`: The entire frontend React interface for the user dashboard.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). This project extends that license.
