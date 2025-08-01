<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class MateriSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Ambil semua ID mapel
        $mapelIds = DB::table('mapel')->pluck('id')->toArray();

        foreach (range(1, 20) as $i) {
            DB::table('materi')->insert([
                'judul' => $faker->sentence,
                'konten' => $faker->paragraph,
                'gambar' => $faker->image('public/storage/images', 640, 480, null, false),
                'kelas' => $faker->randomElement(['X', 'XI', 'XII']),
                'mapel_id' => $faker->randomElement($mapelIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
