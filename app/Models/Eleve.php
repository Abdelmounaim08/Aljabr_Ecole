<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eleve extends Model
{
    use HasFactory;
    protected $fillable = [
        "id",
        'name',
        'prenom',
        'CIN',
        'CNE',
        'dateNaissance',
        'id_ecole',
        'email',
        'niveau_id',
        'class_id',
        'montant',
        'Tel'
    ];

}
