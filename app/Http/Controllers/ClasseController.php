<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classe;
class ClasseController extends Controller
{
   
   
    public function index()
    {
    return Classe::select("id","name", "id_ecole", 'id_Niveau', "created_at", "updated_at")->get();
    
    }
}
