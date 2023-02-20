<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardKaryawanResource;
use App\Http\Resources\KaryawanbyprojectResource;
use App\Models\Employees;
use App\Models\Mutations;
use App\Models\Projects;
use App\Models\Salaryslips;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartDataController extends Controller
{
    public function dashboardstatisticadmin()
    {

        $project = Projects::all();
        $karyawan = Employees::all();

        $date = Carbon::now()->format('Y');
   
        $bulan = ["01" => "Januari", "02" => "Februari", "03" => "Maret", "04" => "April", "05" => "Mei", "06" => "Juni", "07" => "Juli", "08" => "Agustus", "09" => "September", "10" => "Oktober", "11" => "November", "12" => "Desember"];
        // $projectbykaryawan->groupBy('project_id');
        // $slipgajibykaryawan->groupBy('month');

        // Project by Karyawan
        $projectbykaryawan = [];
        for ($i = 0; $i < count($project); $i++) {
            $projectbykaryawan[$i]['label'] = $project[$i]['name'];
            $projectbykaryawan[$i]['id_project'] = $project[$i]['id'];
          
        }
        for ($i = 0; $i < count($projectbykaryawan); $i++) {
            $mutation = Mutations::where('project_id', $projectbykaryawan[$i]['id_project'])->get();
            $projectbykaryawan[$i]['value'] = count($mutation);
        }


        


        // SlipgajiByKaryawan

        $bulan = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        $slipgajibykaryawan = [];
        for ($i = 0; $i < count($bulan); $i++) {
            $slipgajibykaryawan[$i]['label'] = $bulan[$i];
            // $slipgajibykaryawan[$i]['bulan'] = str_pad($i+1, 2, '0', STR_PAD_LEFT);
            $slipgajibykaryawan[$i]['bulan'] = $i+1;
        }
        for ($i = 0; $i < count($slipgajibykaryawan); $i++) {
            $year = new Carbon();
            $salaryslips =Salaryslips::where('year', $year->format('Y'))->where('month', $slipgajibykaryawan[$i]['bulan'])->get();
            $slipgajibykaryawan[$i]['value'] = count($salaryslips);
        }



        return response()->json([
            'total_project' => count($project),
            'total_karyawan' => count($karyawan),
            'karyawan_by_project' => $projectbykaryawan,
            'slipgaji_by_karyawan' => $slipgajibykaryawan,
       

        ]);
    }
    public function dashboardstatisticnon($id)
    {
        $mutation = Mutations::where('employee_id', $id)->where('status', 'ACTIVE')->with('project')->first();
        $project = Projects::where('id', $mutation->project_id)->first();
        $collection = collect($mutation);
        $merged     = $collection->merge($project);
        $result   = $merged->all();

        return new DashboardKaryawanResource($result);
    }
}
