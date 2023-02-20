<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Employees;
use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;


class UsersController extends Controller
{

    public function index()
    {

        $users = Users::with('role');

        return response()->json([
            'data' => $users
        ]);
    }
    public function store(Request $request)
    {
        $users = Users::create($request->all());
        $request->validate([
            'image' => 'required|max:1024',
            'password' => 'required|confirmed'
        ]);

        $validateData['password'] = Hash::make($request->password);
        $user = Users::create($validateData);
        $accessToken = $user->createToken('authToken')->accessToken;
        return response(['user' => $user, 'access_token' => $accessToken], 201);


        $filename = "";
        if ($request->hasFile('image')) {
            $filename = $request->file('image')->storeAs(
                '/public/posts',
                $request->file('image')->hashName()
            );
        } else {
            $filename = Null;
        }

        $users->image = $filename;
        $result = $users->save();
        if ($result) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    // public function image($fileName)
    // {
    //     $path = public_path() . '/public/posts/' . $fileName;
    //     return Response::download($path);
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $users = Users::with('employee')->where('id', $id)->first();
        return response()->json([
            'data' => $users
        ]);
    }


    public function login(Request $request)
    {
        $loginData = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        $user = User::where('username', $request->username)->with('employee', 'role')->where('password', $request->password)->first();
        if ($user) {
            $token = $user->createToken('log');
            // return response()->json([
            //     'token' => $token,
            //     'data'=> $user

            // ]);
            return (new UserResource($user))->additional([
                'token' => $token->plainTextToken

            ]);
            # code...
        }

        return response(['message' => 'user ini tidak terdaftar, silahkan cek cek kembali!'], 400);
        // if (auth()->attempt($loginData)) {
        //     // $user = User::where('username',$request->username)->where('password', $request->password)->first();
        //     $user = auth()->user();
        //     $accessToken = $user->createToken('authToken')->accessToken;

        //     return response(['data' => $user, 'access_token' => $accessToken]);
        // }
        // return response(['message' => 'user ini tidak terdaftar, silahkan cek cek kembali!'], 400);
    }

    public function update(Request $request, $id)
    {
        $users = Users::find($id);

        $users->username = $request->username;
        $users->password = $request->password;
        $users->employee_id = $request->employee_id;
        $users->role_id = $request->role_id;
        $users->image = $request->image;
      

        $users->save();

        // $destination = public_path("storage\\" . $users->image);
        // $filename = "";
        // if ($request->hasFile('new_image')) {
        //     if (File::exists($destination)) {
        //         File::delete($destination);
        //     }

        //     $filename = $request->file('new_image')->store('posts', 'public');
        // } else {
        //     $filename = $request->image;
        // }

        // $users->image = $filename;
        // $users->save();
        $pegawai = Employees::find($users->employee_id);
        $pegawai->name = $request->nama_lengkap;
        $pegawai->jenis_kelamin = $request->jenis_kelamin;
       
        $pegawai->save();
        // $result = $pegawai->save();
        return response()->json([
            'success' => true,
            'user' => $users,
            'pegawai' => $pegawai,

        ]);
        // if ($result) {
        //     return response()->json([
        //         'success' => true,
        //         'user' => $users,
        //         'pegawai' => $pegawai,

        //     ]);
        // } else {
        //     return response()->json(['success' => false]);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $users = Users::find($id);
        $users->delete();
        return response()->json([
            'message' => "Users Info deleted succesfully",
        ], 200);
    }
}
