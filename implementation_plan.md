# Backend Theme Persistence

Currently, the light/dark mode preference is stored entirely in the browser's `localStorage`. This causes the issue where logging out of an account set to light mode leaves the browser in light mode, which then incorrectly applies to the next user who logs in (or the guest pages if not forced to dark).

To ensure that each account maintains its own independent theme preference that persists across devices and resets properly upon logout, we need to save the theme setting directly to the `users` database table.

## User Review Required

> [!IMPORTANT]
> This requires a database migration to add a `theme` column to the `users` table. Please review the plan below and approve if you are comfortable with running migrations.

## Proposed Changes

### Database & Models

#### [NEW] Database Migration
- Run `php artisan make:migration add_theme_to_users_table`
- Add `$table->string('theme')->default('dark');` to the `users` table.

#### [MODIFY] `app/Models/User.php`
- Add `'theme'` to the `$fillable` array so it can be mass-assigned.

---

### Controllers & Routing

#### [MODIFY] `routes/web.php`
- Add a new PATCH route specifically for updating the theme: `Route::patch('/profile/theme', [ProfileController::class, 'updateTheme'])->name('profile.theme.update');`

#### [MODIFY] `app/Http/Controllers/ProfileController.php`
- Add the `updateTheme(Request $request)` method to validate and save the `'light'` or `'dark'` string to the authenticated user's profile.

---

### Frontend

#### [MODIFY] `resources/js/Pages/Profile/Show.jsx`
- Replace the `localStorage` approach with an Inertia form submission to the new `profile.theme.update` route whenever the toggle is clicked.

#### [MODIFY] `resources/views/app.blade.php`
- Update the initialization script to read the authenticated user's theme directly from the backend data payload (or by clearing localstorage on logout), ensuring that when a user logs in, the app instantly switches to their specific theme preference.

## Verification Plan

### Automated Tests
- Run `php artisan migrate`

### Manual Verification
1. Open the app as a guest (should be Dark Mode).
2. Log in as User A, toggle to Light Mode. The database should update.
3. Log out. The app should return to Dark Mode instantly.
4. Log in as User B. User B should see Dark Mode.
5. Log back in as User A. The app should instantly load in Light Mode.
