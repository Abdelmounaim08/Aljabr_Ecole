<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Niveau;
class NiveauController extends Controller
{
   
public function index()
{
return Niveau::select("id","name", "id_ecole", "created_at", "updated_at")->get();

}



/**
 * Show the form for creating a new resource.
 */

/**
 * Store a newly created resource in storage.
 */
public function store(Request $request)
{
 
    $request->validate([
        "name" => 'required',
        "prenom" => 'required',
        "CIN" => 'required',
        "CNE" => 'required', 
        "dateNaissance" => 'required|date',
        "email" => 'required|email',
        "class" => "required",
        "id_ecole" => "required",
        'Niveau' => "required"
    ]);

    Eleve::create([
        "name" => $request->name,
        "prenom" => $request->prenom,
        "CIN" => $request->CIN,
        "CNE" => $request->CNE,
        "dateNaissance" => $request->dateNaissance,
        "email" => $request->email,
        "class" => $request->class,
        "id_ecole" => $request->id_ecole,
        "Niveau" => $Niveau
    ]);

    return response()->json([
        "message" => 'Successfully created the school.'
    ]);
}


public function update(Request $request, $id)
{
    $request->validate([
        "name" => 'required',
        "prenom" => 'required',
        "CIN" => 'required',
        "CNE" => 'required', 
        "dateNaissance" => 'required|date',
        "email" => 'required|email',
        "class" => "required",
        "id_ecole" => "required",
        'Niveau' => "required"
    ]);

    $eleve = Eleve::findOrFail($id);

    $eleve->name = $request->name;
    $eleve->prenom = $request->prenom;
    $eleve->CIN = $request->CIN;
    $eleve->CNE = $request->CNE;
    $eleve->dateNaissance = $request->dateNaissance;
    $eleve->email = $request->email;
    $eleve->class = $request->class;
    $eleve->id_ecole = $request->id_ecole;
    $eleve->Niveau = $request->Niveau;

    $eleve->save();

    return response()->json([
        'message' => 'Élève mis à jour avec succès',
        'data' => $eleve
    ]);
}

/**
 * Remove the specified resource from storage.
 */
public function destroy($id)
{
    $eleve = Eleve::findOrFail($id);

    $eleve->delete();

    return response()->json([
        'message' => 'Élève supprimé avec succès'
    ]);
}
}


