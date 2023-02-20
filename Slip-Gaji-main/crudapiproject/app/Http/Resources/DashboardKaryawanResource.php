<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardKaryawanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
  
        return [
    
            'mutation_date'=> $this['mutation_date'],
            'project_name' => $this['name'],
            'dir_name' => $this['dir_name']
        ];
    }
}
