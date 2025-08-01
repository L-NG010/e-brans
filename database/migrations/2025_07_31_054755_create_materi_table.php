<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mapel', function (Blueprint $t) {
            $t->id();
            $t->string('nama');
            $t->enum('kategori',['umum','produktif'])->default('umum');
        });
        Schema::create('materi', function (Blueprint $t) {
            $t->id();
            $t->string('judul');
            $t->text('konten');
            $t->string('gambar');
            $t->enum('kelas',['X','XI','XII'])->default('X');
            $t->unsignedBigInteger('mapel_id');
            $t->foreign('mapel_id')->references('id')->on('mapel')->onDelete('cascade');
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materi');
    }
};
