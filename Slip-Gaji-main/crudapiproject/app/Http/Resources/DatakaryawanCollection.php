<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DatakaryawanCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'data' => $this->collection[0]->id
        ];
        // return [

        //     "id" => $this->id,
        //     "identity" => $this->identity,
        //     "name" => $this->name,
        //     "phone" => $this->phone,
        //     "email" => $this->email,
        //     "jenis_kelamin" => $this->jenis_kelamin,
        //     // "project"=> [

        //     //         "id"=> $this->identity,
        //     //         "name"=> $this->identity,
        //     //         "dir_name"=> $this->identity,


        //     // ],
        //     // "user"=> [



        //     //         "image"=> $this->identity,
        //     //         "remember_token"=> $this->identity,


        //     // ]

        // ];
    }
}
