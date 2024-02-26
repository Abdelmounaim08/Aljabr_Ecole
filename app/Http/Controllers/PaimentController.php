<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PaimentExport;
use Illuminate\Support\Facades\File;
use App\Models\Paiment;
class PaimentController extends Controller
{
    

    public function importExcel(Request $request)
    {
        $jsonData = $request->json()->all();

        foreach ($jsonData as $data) {
            $paiment = new Paiment();
            $paiment->CNE = $data['CNE'];
            $paiment->moisPaiment = $data['moisPaiment'];
            $paiment->montant = $data['montant'];
            $paiment->save();
        }

        return response()->json([
            'message' => 'Données insérées avec succès.'
        ]);
    
    }
    public function downloadTemplate()
    {
        return Excel::download(new PaimentExport(), 'PaimentModel.xlsx');
    } 
    
    function index(){
          $year = date('Y'); // Récupère l'année actuelle

       return $paiments = DB::table('paiments')
            ->select('id', 'CNE', DB::raw('MONTHNAME(moisPaiment) as mois'),'montant', 'created_at', 'updated_at')
            ->whereYear('moisPaiment', $year)
            ->get();
            
    }
    function payer(Request $request)
{
    $request->validate([
        "CNE" => 'required',
        "moisPaiment" => 'required',
        "montant" => 'required'
    ]);

    Paiment::create([
        "CNE" => $request->CNE, 
        "moisPaiment" => $request->moisPaiment,
        'montant'=> $request->montant
    ]);

    return response()->json([
        "message" => 'Le paiement est passé.'
    ]);
}
}
