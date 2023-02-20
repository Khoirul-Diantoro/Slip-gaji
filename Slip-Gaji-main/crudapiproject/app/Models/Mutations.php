<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Mutations extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'project_mutations';
  
    protected $guarded = [];
    protected $dates = ['created_at'];
    public function employee()
    {
        return $this->belongsTo(Employees::class);
    }
    public function project()
    {
        return $this->belongsTo(Projects::class);
    }

}
