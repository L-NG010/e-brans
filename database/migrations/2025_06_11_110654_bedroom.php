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
        Schema::create('bedroom', function (Blueprint $b) {
            $b->id();
            $b->string('name');
            $b->enum('status', ['ready', 'unready', 'maintance']);
            $b->tinyInteger('is_occupied');
        });

        Schema::create('bookings', function (Blueprint $b) {
            $b->id();
            $b->unsignedBigInteger('guest_id');
            $b->unsignedBigInteger('room_id');
            $b->date('check_in_date');
            $b->date('check_out_date');
            $b->integer('duration')->nullable();
            $b->integer('price',);
            $b->enum('status', ['pending', 'confirmed', 'canceled'])->default('pending');
        });

        Schema::create('daily_revenue', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->decimal('total_income');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
