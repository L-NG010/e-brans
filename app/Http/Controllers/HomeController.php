<?php

namespace App\Http\Controllers;

use App\Models\Mppg;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Main', [
        ]);
    }
}
