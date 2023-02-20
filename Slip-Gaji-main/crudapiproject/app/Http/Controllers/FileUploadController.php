<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;


class FileUploadController extends Controller
{
    public function index()
    {
    }

    public function uploadImage(Request $request)
    {


        $path = $request->file('file_upload')->storeAs(
            '/public/posts/img',
            $request->file('file_upload')->hashName()
        );
        $fileAccess = Storage::url($path);

        return response()->json(

            [
                'msg' => "Image has successfully uploaded",
                'filename' => $request->file('file_upload')->hashName(),
                'base_url' => URL::to('/') . $fileAccess
            ]
        );
    }
    public function uploadPdf(Request $request)
    {

        $path = $request->file('file_upload')->storeAs(
            '/public/posts/pdf',
            $request->file('file_upload')->hashName()
        );
        $fileAccess = Storage::url($path);

        return response()->json(

            $data = [
                'msg' => "PDF has successfully uploaded",
                'filename' => $request->file('file_upload')->hashName()
            ]
        );
    }
    public function getImageRequest($filename)
    {
        $path = "public/posts/img/" . $filename;
        $fileAccess = Storage::url($path);
        return response()->json(

            [
                'base_url' => URL::to('/') . $fileAccess,
                'filename' => $filename



            ]
        );
    }
    public function showImageRequest($filename)
    {
        $path = "public/posts/img/" . $filename;
        $file = Storage::disk('local')->get($path);
        $response = Response::make($file, 200);
        $response->header('Content-Type', 'image/png');
        return $response;
    
    }
    public function downloadPdf(Request $request, $filename)
    {
        $path =  '/public/posts/pdf/' . $filename;

        return Storage::download($path);
        // dd($path);
        // Storage::download($request->input('filename'));
        // $test = "posts/GXUebrjwFHO73yXh2vik2oKc8Ewj7ttCfkX5u2Xb.png";
        // $request->input('pdf')
        // $fileAccess = Storage::download($request->input('pdf'));
        // $fileAccess = Storage::url($request->input('pdf'));
        // $headers = [
        //     'Content-Type' => 'application/pdf',
        // ];
        // return response()->json(
        //     [
        //         'data' => URL::to('/').$fileAccess
        //     ]
        // );
        // return response()->download($fileAccess, 'filename.pdf', $headers);


    }
}
