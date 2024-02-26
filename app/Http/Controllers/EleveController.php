<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserResource;
use App\Models\Eleve;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\EleveExport;


class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     * `id`, `name`, `prenom`, `CIN`, `CNE`, `dateNaissance`, `id_ecole`, `email`, `niveau_id`, `class_id`, `montant`, `Tel`
     */
    public function importExcel(Request $request)
{
    $data = $request->all();

    Eleve::create([
        'name' => $data['name'],
        'prenom' => $data['prenom'],
        'CIN' => $data['CIN'],
        'CNE' => $data['CNE'],
        'dateNaissance' => $data['dateNaissance'],
        'id_ecole' => $data['id_ecole'],
        'email' => $data['email'],
        'niveau_id' => $data['niveau_id'],
        'class_id' => $data['class_id'],
        'montant' => $data['montant'],
        'Tel' => $data['Tel']
]);

    return response()->json([
        'message' => 'Données insérées avec succès.',
        'data' => $data
    ]);
}
    
    public function downloadTemplate()
{
    return Excel::download(new EleveExport(), 'eleve_template.xlsx');
}
    public function verification(Request $request)
    {
        $eleve = Eleve::where('CNE', $request->input('Massar'))
        ->where('Tel', $request->input('Tel'))
            ->where('dateNaissance', $request->input('dateNaissance'))
            ->where('email', $request->input('email'))
            ->first();
    
        if ($eleve) {
            return response()->json(['message' => 'Les informations de l\'élève existent dans la base de données.', 'eleve' => $eleve]);
        } else {
            return response()->json(['message' => 'Les informations de l\'élève ne sont pas présentes dans la base de données.']);
        }
    }



  /*  public function index()
    {
        if (auth()->check()) {
            // Récupérer l'ID de l'école de l'administrateur responsable
            $id_ecole_responsable = auth()->user()->id_ecole;
    
            // Récupérer les élèves ayant le même ID d'école que l'administrateur responsable
            $eleves = Eleve::where('id_ecole', $id_ecole_responsable)->get();
    
            return $eleves;
        } else {
            return response()->json(['message' => 'Utilisateur non authentifié.']);
        }
    }*/
public function index()
    {
  return Eleve::select("id","name", "prenom", "CIN","CNE","dateNaissance","email","Tel","montant","id_ecole","niveau_id", "class_id")->get();
  
    }

    public function show($id)
    {
        $eleve = Eleve::find($id);
    
        if (!$eleve) {
            return response()->json(['message' => 'Student not found'], 404);
        }
    
        return response()->json($eleve, 200);
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
            "CIN" => 'nullable',
            "CNE" => 'required', 
            "dateNaissance" => 'required|date',
            "email" => 'required|email',
            "Tel" => 'required',
            "montant" => 'required',
            "class_id" => "required",
            "id_ecole" => "required",
            'niveau_id' => "required"
        ]);
    
        Eleve::create([
            "name" => $request->name,
            "prenom" => $request->prenom,
            "CIN" => $request->CIN,
            "CNE" => $request->CNE,
            "dateNaissance" => $request->dateNaissance,
            "email" => $request->email,
            "Tel" => $request->Tel,
            "montant" => $request->montant,
            "class_id" => $request->classe_id,
            "id_ecole" => $request->id_ecole,
            "niveau_id" =>$request->niveau_id
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
            "email" => 'required|email',
            "Tel" => 'required',
            "montant" => 'required',
            "class_id" => "required",
            "id_ecole" => "required",
            'niveau_id' => "required"
        ]);

        $eleve = Eleve::findOrFail($id);

        $eleve->name = $request->name;
        $eleve->prenom = $request->prenom;
        $eleve->CIN = $request->CIN;
        $eleve->CNE = $request->CNE;
        $eleve->email = $request->email;
        $eleve->Tel = $request->Tel;
        $eleve->montant = $request->montant;
        $eleve->class_id = $request->class_id;
        $eleve->id_ecole = $request->id_ecole;
        $eleve->niveau_id = $request->niveau_id;

        $eleve->save();

        return response()->json([
            'message' => 'Élève mis à jour avec succès',
            'data' => $eleve
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
