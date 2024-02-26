<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Demande;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class DemandeController extends Controller
{
    

    public function createRequest(Request $request)
    {
        $requestData = $request->only([
            'name',
            'description',
            'image',
            'adress',
            'mail',
            'contact',
            'sitweb',
            'reseaux',
            'nameAdmin',
            'emailAdmin',
            'password',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
    
            // Générer un nom unique pour l'image
            $imageName = Str::random() . '.' . $image->getClientOriginalExtension();
    
            // Déplacer l'image vers le stockage permanent
            $imagePath = $image->storeAs('demandes/image', $imageName, 'public');
    
            // Mettre à jour les données de la demande avec le chemin de l'image
            $requestData['image'] = $imagePath;
        }
    
        $requestData['password'] = bcrypt($requestData['password']);
        Demande::create($requestData);
    
        return response()->json(['message' => 'Registration request created']);
    }
    public function showRequests()
{
    // Récupérer toutes les demandes d'inscription en attente
    $requests = Demande::all();

    // Retourner les demandes en tant que réponse
    return response()->json( $requests);
} 
public function destroy($id)
{
    try {
        
        $request = Demande::findOrFail($id);

       
        $imagePath = strip_tags($request->image); 
        
        $request->delete();

        // Supprimer l'image du stockage
        Storage::disk('public')->delete($imagePath);

        return response()->json(['message' => 'Registration request and associated image deleted']);
    } catch (\Exception $e) {
        // Gérer les erreurs
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}