<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Salaryslips extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];
    protected $dates = ['created_at'];
    public function employee()
    {
        return $this->belongsTo(Employees::class,'employee_id');
    }
    public function project()
    {
        return $this->belongsTo(Projects::class,'project_id');
    }
}
