<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Projects extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];
    protected $dates = ['created_at'];
    public function mutation(){
        return $this->hasMany(Mutations::class, 'project_id');
    }
    public function salaryslip(){
        return $this->hasMany(Salaryslips::class, 'project_id');
    }
    
}
