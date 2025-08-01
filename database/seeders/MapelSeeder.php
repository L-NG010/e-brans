<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('mapel')->insert([
            ['nama' => 'Matematika', 'kategori' => 'umum'],
            ['nama' => 'PKDK', 'kategori' => 'produktif'],
            ['nama' => 'KRPL', 'kategori' => 'produktif'],
            ['nama' => 'Bahasa Indonesia', 'kategori' => 'umum'],
        ]);
    }
}
