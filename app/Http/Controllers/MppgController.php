<?php

namespace App\Http\Controllers;

use App\Models\Mppg;
use Illuminate\Http\Request;

class MppgController extends Controller
{
    public function index(){
        return Mppg::all()->select("materi")->first();
    }
}
