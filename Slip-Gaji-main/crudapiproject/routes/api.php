<?php

use App\Http\Controllers\ChartDataController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\MutationsController;

use App\Http\Controllers\ProjectsController;

use App\Http\Controllers\RolesController;

use App\Http\Controllers\SalaryslipsController;

use App\Http\Controllers\UsersController;

use App\Http\Controllers\EmployeesCreate;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\MutationCreate;
use App\Http\Controllers\SalaryslipCreate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('employees', EmployeesController::class);
Route::get('/chart/dashboardadmin',[ ChartDataController::class, 'dashboardstatisticadmin']);
Route::get('/chart/dashboardnon/{id}',[ ChartDataController::class, 'dashboardstatisticnon']);


Route::apiResource('mutations', MutationsController::class);
Route::apiResource('projects', ProjectsController::class);
Route::apiResource('roles', RolesController::class);
Route::apiResource('salaryslips', SalaryslipsController::class);


Route::get('salaryslips/getbyProject/{id?}', [SalaryslipsController::class, 'showbyproject']);


Route::apiResource('salaryslipsbyemployee', SalaryslipCreate::class);

Route::apiResource('users', UsersController::class);
Route::post('/auth/login', [UsersController::class, 'login']);



Route::apiResource('fullprofile', EmployeesCreate::class);
Route::apiResource('mutationbyid',MutationCreate::class);

Route::post('/upload/uploadImage', [FileUploadController::class, 'uploadImage']);
Route::post('/upload/uploadPdf', [FileUploadController::class, 'uploadPdf']);
Route::get('/fileupload/getImage/{filename}', [FileUploadController::class, 'getImageRequest']);
Route::get('/fileupload/showImage/{filename}', [FileUploadController::class, 'showImageRequest']);

Route::get('/downloadpdf/{filename}', [FileUploadController::class, 'downloadPdf']);




