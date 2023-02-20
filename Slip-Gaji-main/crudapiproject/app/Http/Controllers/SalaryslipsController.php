<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\Salaryslips;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SalaryslipsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $salaryslip = Salaryslips::all();
        // $salaryslip = DB::table('salaryslips')
        //     ->select('project_id')
        //     ->groupBy('project_id')
        //     ->get();
        // $posts = Projects::withCount('salaryslip')->with('salaryslip')->get();
        $salaryslip = Salaryslips::with('project')->get();
        return response()->json(
            [
                'data' => $salaryslip,


            ]
        );
    }


    public function store(Request $request)
    {
        $salaryslip = Salaryslips::create($request->all());
        // $request->validate([
        //     'file_path'=>'required|mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf|max:2048'
        // ]);

        // $filename="";
        // if($request->hasFile('file_path')){
        //     $filename=$request->file('file_path')->store('posts','public');
        // }else{
        //     $filename=Null;
        // }

        // $salaryslip->file_path=$filename;
        $result=$salaryslip->save();
        if($result){
            return response()->json(['success'=>true]);
        }else{
            return response()->json(['success'=>false]);
        }
    }


    public function show($id)
    {
        $salaryslip = Salaryslips::find($id);
        return response()->json([
            'data' => $salaryslip
        ]);
    }

    public function showbyproject($id)
    {
        $salaryslip = Salaryslips::where('project_id', $id)->with('employee')->get();
        return response()->json([
            'data' => $salaryslip
        ]);
    }


    public function update(Request $request, $id)
    {
        $salaryslip = Salaryslips::find($id);
        $salaryslip->update($request->all());

        $destination=public_path("storage\\".$salaryslip->file_path);
        $filename="";
        if($request->hasFile('new_file_path')){
            if(File::exists($destination)){
                File::delete($destination);
            }

            $filename=$request->file('new_file_path')->store('posts','public');
        }else{
            $filename=$request->file_path;
        }

        $salaryslip->file_path=$filename;
        $result=$salaryslip->save();
        if($result){
            return response()->json(['success'=>true]);
        }else{
            return response()->json(['success'=>false]);
        }
    }


    public function destroy(Request $request, $id)
    {
        $salaryslip = Salaryslips::find($id);
        $salaryslip->delete();
        return response()->json([
            'message' => "Salaryslips Info deleted succesfully",
        ], 200);
    }
}
