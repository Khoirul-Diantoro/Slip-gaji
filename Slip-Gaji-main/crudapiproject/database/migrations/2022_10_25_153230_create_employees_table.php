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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('identity');
            $table->string('name');
            $table->string('phone');
            $table->string('email');
            $table->enum('jenis_kelamin', ['PRIA', 'WANITA']);
            $table->timestamps();
            $table->softDeletes();
        });
         // Insert some stuff
         DB::table('employees')->insert(
            array(
                [
                    "identity"=> "BS-1004-2002",
                    "name"=> "Arman Maulana",
                    "phone"=> "081927773993",
                    "email"=> "Arman@test.com",
                    "jenis_kelamin" => 'PRIA',
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
        Schema::dropIfExists('employees');
      
    }
};
