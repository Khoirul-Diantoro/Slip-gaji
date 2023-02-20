<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Users extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];
    protected $dates = ['created_at'];
    public function role()
    {
        return $this->belongsTo(Roles::class);
    }
    public function employee()
    {
        return $this->belongsTo(Employees::class);
    }
}
