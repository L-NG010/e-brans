<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Nette\Schema\Schema as SchemaSchema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guru', function (Blueprint $t) {
            $t->id();
            $t->string('nama');
            $t->timestamps();
        });
        Schema::create('jurusan', function (Blueprint $t) {
            $t->id();
            $t->string('nama');
            $t->timestamps();
        });
        Schema::create('mapel', function (Blueprint $t) {
            $t->id();
            $t->string('nama');
            $t->enum('kategori', ['umum', 'produktif'])->default('umum');
            $t->unsignedBigInteger('jurusan_id');
            $t->foreign('jurusan_id')->references('id')->on('jurusan')->onDelete('cascade');
            $t->timestamps();
        });
        Schema::create('materi', function (Blueprint $t) {
            $t->id();
            $t->string('judul');
            $t->text('konten');
            $t->string('gambar');
            $t->enum('kelas', ['X', 'XI', 'XII'])->default('X');
            $t->unsignedBigInteger('mapel_id');
            $t->foreign('mapel_id')->references('id')->on('mapel')->onDelete('cascade');
            $t->unsignedBigInteger('guru_id');
            $t->foreign('guru_id')->references('id')->on('guru')->onDelete('cascade');
            $t->unsignedInteger('jumlah_dilihat')->default(0);
            $t->text('rangkuman')->nullable();
            $t->timestamps();
        });
        Schema::create('siswa_materi', function (Blueprint $t) {
            $t->id();
            $t->unsignedBigInteger('siswa_id');
            $t->unsignedBigInteger('materi_id');
            $t->timestamp('viewed_at')->nullable();

            $t->foreign('siswa_id')->references('id')->on('siswa')->onDelete('cascade');
            $t->foreign('materi_id')->references('id')->on('materi')->onDelete('cascade');
            $t->unique(['siswa_id', 'materi_id']); // biar 1 siswa tercatat sekali aja
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guru');
        Schema::dropIfExists('jurusan');
        Schema::dropIfExists('mapel');
        Schema::dropIfExists('materi');
    }
};
