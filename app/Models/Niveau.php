<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    protected $fillable = ['name', 'id_ecole'];

    public function ecole()
    {
        return $this->belongsTo(Ecole::class, 'id_ecole');
    }

    public function classes()
    {
        return $this->hasMany(Classe::class, 'id_niveau');
    }
}