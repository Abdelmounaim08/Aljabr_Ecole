<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $fillable = ['name', 'id_ecole', 'id_niveau'];

    public function ecole()
    {
        return $this->belongsTo(Ecole::class, 'id_ecole');
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class, 'id_niveau');
    }
}