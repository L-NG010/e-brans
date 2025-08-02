<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',[HomeController::class,'index']);
Route::get('/materi/mapel/{mapelId}', [CourseController::class, 'showByMapel']);

