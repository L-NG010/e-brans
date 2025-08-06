<?php

namespace App\Http\Controllers;

use App\Models\Mapel;
use App\Models\Materi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function showByMapel($mapelId)
{
    $mapel = Mapel::all();                        // ini array semua mapel
    $materi = Materi::where('mapel_id', $mapelId) // filter materi
                    ->with('mapel')
                    ->get();

    return inertia('MateriPage', [
        'mapel'  => $mapel,
        'materi' => $materi
    ]);
}
}
