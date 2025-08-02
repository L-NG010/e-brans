<?php

namespace App\Http\Controllers;

use App\Models\Mapel;
use App\Models\Materi;
use App\Models\Mppg;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
{
    $mapel = Mapel::all(); // Tidak perlu toArray() di sini
    $materi = Materi::with('mapel')->get(); // Gunakan eager loading

    return inertia('Main', [
        'mapel' => $mapel,
        'materi' => $materi
    ]);
}
}
