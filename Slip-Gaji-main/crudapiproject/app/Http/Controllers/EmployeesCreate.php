<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Employees;
use App\Models\Mutations;
use App\Models\Users;

use App\Models\Salaryslips;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EmployeesCreate extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $employees = Employees::with(['project'])->get();

        return response()->json([
            'data' => $employees,

        ]);
    }

    public function store(Request $request)
    {

        // Employeee
        $dataemployee = array(

            "identity" => $request->input('identity'),
            "name" => $request->input('name'),
            "phone" => $request->input('phone'),
            "email" => $request->input('email'),
            "jenis_kelamin" => $request->input('jenis_kelamin')

        );
        $employees = Employees::create($dataemployee);


        $pegawai = Employees::find($employees->id);
        // Users
        $datausers = [
            "username" => $request->input('username'),
            "password" => $request->input('password'),
            "role_id" => "1",
            "image" => $request->input('images'),
            "remember_token" => Carbon::now(),
        ];
        $datausers2 = new Users($datausers);
        $pegawai->user()->save($datausers2);


        // Mutation
        $datamutasi = [

            "project_id" =>  $request->input('project_id'),
            "mutation_date" =>  $request->input('mutation_date'),
            "status" =>  $request->input('status'),
        ];

        // $mutations = Mutations::create($datamutasi);

        $datamutasi2 = new Mutations($datamutasi);
        $pegawai->mutation()->save($datamutasi2);



        return response()->json([
            'data' => $employees->id,
            'request' => $request->all(),

        ]);
    }


    public function show($id)
    {

        $employees = Employees::where('id', $id)->select('identity', 'name', 'phone', 'email','jenis_kelamin')->first();
        $project = Mutations::where('employee_id', $id)->select('id as mutation_id', 'project_id', 'mutation_date', 'status')->orderBy('id', 'DESC')->first();
        $akun = Users::where('employee_id', $id)->select('id as users_id', 'username', 'password', 'image', 'remember_token')->first();


        return response()->json([
            'data' => $employees,
            'project' => $project,
            'akun' => $akun

        ]);
    }
    public function update(Request $request, $id)
    {


        $employees = Employees::find($id);
        // Employeee
        $dataemployee = [

            "identity" => $request->input('identity'),
            "name" => $request->input('name'),
            "phone" => $request->input('phone'),
            "email" => $request->input('email'),
            "jenis_kelamin" => $request->input('jenis_kelamin')
        ];





        $employees->update($dataemployee);


        // Users
        $datausers = [
            "username" => $request->input('username'),
            "password" => $request->input('password'),
            "role_id" => "1",
            "image" => $request->input('images'),
            "remember_token" => $request->input('remember_token'),
        ];
        $employees->user()->update($datausers);

        // $users = DB::table('users')
        //     ->where('employee_id', $id)
        //     ->update($datausers);

        // Mutation
        $datamutasi = array(
            "employee_id" => $employees->id,
            "project_id" =>  $request->input('project_id'),
            "mutation_date" =>  $request->input('mutation_date'),
            "status" =>  $request->input('status'),
        );
        $employees->mutation()->update($datamutasi);

        // $mutations = DB::table('project_mutations')
        //     ->where('employee_id', $id)
        //     ->update($datamutasi);




        return response()->json([
            'data' => $employees->id,
            'request' => $request->all(),
            'coba' => $dataemployee
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $employees = Employees::find($id);
        $employees->delete();

        Mutations::where('employee_id', $id)->delete();
        Users::where('employee_id', $id)->delete();
        Salaryslips::where('employee_id', $id)->delete();

        return response()->json([
            'message' => "Employee Info deleted succesfully",
            'coba' => $employees
        ], 200);
    }
}
