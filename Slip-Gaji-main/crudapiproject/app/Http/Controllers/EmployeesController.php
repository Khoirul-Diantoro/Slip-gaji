<?php

namespace App\Http\Controllers;

use App\Http\Resources\DatakaryawanCollection;

use App\Models\Employees;
use Illuminate\Http\Request;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employees::with(['project', 'user'])->get();
        
    //    return new DatakaryawanCollection($employees);
        return response()->json([
            'data' => $employees,
            
        
        ]);
     
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $employees = Employees::create($request->all());
        return response()->json([
            'data' => $employees
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employees = Employees::find($id);
        return response()->json([
            'data' => $employees
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $employees = Employees::find($id);
        $employees->update($request->all());

        return response()->json([
            'data' => $employees
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $employees = Employees::find($id);
        $employees->delete();
        return response()->json([
            'message' => "Employee Info deleted succesfully",
        ], 200);
    }
}
