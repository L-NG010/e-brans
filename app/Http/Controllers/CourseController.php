<?php

namespace App\Http\Controllers;

use App\Models\Mapel;
use App\Models\Materi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function showByMapel()
{
    $mapel = Mapel::all(); // Tidak perlu toArray() di sini
    $materi = Materi::with('mapel')->get(); // Gunakan eager loading

    return inertia('MateriPage', [
        'mapel' => $mapel,
        'materi' => $materi
    ]);
}
}
