<?php

namespace App\Http\Controllers;
use App\Models\Mutations;
use Illuminate\Http\Request;

class MutationCreate extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }
    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        $mutations = Mutations::find($id);
        return response()->json([
            'data' => $mutations,
       
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
