<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiment extends Model
{
    // Nom de la table associée au modèle

    protected $fillable = ['CNE', 'moisPaiment','montant']; // Les attributs du modèle pouvant être remplis
    protected $table = 'paiments';
   
}

