<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('password');
            $table->unsignedBigInteger('employee_id');
            $table->foreign('employee_id')->references('id')->on('employees');
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');
            $table->string('image');
            $table->date('remember_token');
            $table->timestamps();
            $table->softDeletes();
        });
        DB::table('users')->insert(
            array(
                [
                
                    "username" => "admin",
                    "password" => "admin",
                    "employee_id" => '1',
                    'role_id' => '1',
                    "image" => "ER947C4CCPJleaSFZk09Ynf0lKqR8hJsBOUq5U6E.webp",
                    'remember_token' => '2022-04-21',
                    "created_at" =>  \Carbon\Carbon::now(), # new \Datetime()
                    "updated_at" => \Carbon\Carbon::now(),  # new \Datetime()
                ],


            )



        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
