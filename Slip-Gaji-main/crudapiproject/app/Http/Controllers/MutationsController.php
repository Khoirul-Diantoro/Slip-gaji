<?php

namespace App\Http\Controllers;

use App\Models\Mutations;
use Illuminate\Http\Request;

class MutationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mutations = Mutations::all();
        return $mutations;
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
        $mutationactive = Mutations::where(['status' => $request->status, 'employee_id' => $request->employee_id])->get();
        // for ($i=0; $i < count($mutationactive); $i++) { 
        //     $mutationactive[$i]->status = 'INACTIVE';
        //     return ;
        // }
        foreach ($mutationactive as $active) {

            $mutations = Mutations::find($active->id);

            $mutations->status = 'INACTIVE';

            $mutations->save();

            
        }
        
        $mutations2 = Mutations::create($request->all());
        return response()->json([
            'data' => $mutations2
        ]);

    }
    public function show($id)
    {
        $mutations = Mutations::where('employee_id', $id)->with('project')->get();
        return response()->json([
            'data' => $mutations,
       
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $mutations = Mutations::find($id);
        $mutations->update($request->all());

        return response()->json([
            'data' => $mutations
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
        $mutations = Mutations::find($id);
        $mutations->delete();
        return response()->json([
            'message' => "Mutations Info deleted succesfully",
        ], 200);
    }
}
