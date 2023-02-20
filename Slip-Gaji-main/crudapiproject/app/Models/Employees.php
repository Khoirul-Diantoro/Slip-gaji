<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employees extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $guarded = [];
    protected $dates = ['created_at'];
    public function mutation(){
        return $this->hasMany(Mutations::class, 'employee_id');
    }
    
    public function user(){
        return $this->hasMany(Users::class, 'employee_id');
    }
    public function salaryslips(){
        return $this->hasMany(Salaryslips::class, 'employee_id');
    }
    public function project(){
        return $this->belongsToMany(Projects::class, 'project_mutations','employee_id','project_id')->wherePivot('status', 'ACTIVE')->wherePivotNull('deleted_at');;
    }

    
}
