<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
 
use Validator;
use App\Models\User;
use Auth;
use App\Models\Demande;

use App\Models\Ecole;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class AuthController extends Controller
{

    public function approveRequest($id)
    {
        try {
            // Récupérer la demande d'inscription avec l'ID donné
            $request = Demande::findOrFail($id);
    
            // Récupérer le chemin d'accès à l'image de la demande
            
            $imagePath = strip_tags($request->image); 
            
             // Supprimer les balises HTML
            if (Storage::disk('public')->exists($imagePath)) {
                // L'image existe
                echo "L'image existe.";
            } else {
                // L'image n'existe pas
                echo "L'image n'existe pas.";
            }
    
            // Extraire le nom de fichier de l'image
            $imageName = pathinfo($imagePath, PATHINFO_BASENAME);
    
            // Générer un nouveau nom unique pour l'image
            $newImageName = Str::random(40) . '.' . pathinfo($imageName, PATHINFO_EXTENSION);
    
            // Déplacer l'image vers le stockage permanent avec le nouveau nom d'image
            $newImagePath = Storage::disk('public')->putFileAs(
                'ecoles/image',
                Storage::disk('public')->path($imagePath),
                $newImageName
            );
    
            // Créer un nouvel utilisateur admin associé à l'école
          
    
            // Créer l'école associée à la demande avec le nouveau chemin d'image
            $ecole = Ecole::create([
                'name' => $request->name,
                'adress' => $request->adress,
                'image' => $newImagePath,
                'description' => $request->description,
                'contact' => $request->contact,
                'reseaux' => $request->reseaux,
                'sitweb' => $request->sitweb,
                'mail' => $request->mail
            ]);
            $user = User::create([
                'name' => $request->nameAdmin,
                'email' => $request->emailAdmin,
                'password' => bcrypt($request->password),
                'role' => 'admin',
                'id_ecole' => $ecole->id // Associer l'école créée à l'utilisateur
            ]);
            // Supprimer la demande d'inscription
            $request->delete();
    
            // Retourner une réponse appropriée
            return response()->json(['message' => 'Registration request approved']);
        } catch (\Exception $e) {
            // Gérer les erreurs
            return response()->json(['error' => $e->getMessage()], 500);
        }
    } 

    public function update(Request $request, $id)
    {
        // Validate the data received from the client
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            // Add other validation rules for the fields you want to update
        ]);
    
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }
    
        // Fetch the user by ID
        $user = User::find($id);
        if (!$user) {
            $response = [
                'success' => false,
                'message' => 'User not found',
            ];
            return response()->json($response, 404);
        }
    
        // Update the user data
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        // Update other fields as needed
        $user->save();
    
        // Return a success response
        $response = [
            'success' => true,
            'message' => 'User updated successfully',
            'user' => $user,
        ];
        return response()->json($response, 200);
    }
    public function destroy($id)
{
    // Fetch the user by ID
    $user = User::find($id);
    if (!$user) {
        $response = [
            'success' => false,
            'message' => 'User not found',
        ];
        return response()->json($response, 404);
    }

    // Delete the user
    $user->delete();

    // Return a success response
    $response = [
        'success' => true,
        'message' => 'User deleted successfully',
    ];
    return response()->json($response, 200);
}
  /*  public function getUserInfo(Request $request)
    {
        $username = $request->input('login');
        $user = User::where('username', $username)->first();

        if ($user) {
            $userInfo = [
                'name' => $user->name,
                'email' => $user->email,
                // Ajoutez d'autres informations que vous souhaitez renvoyer
            ];

            return response()->json($userInfo);
        } else {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }
    }*/

    public function index()
    {
        return User::select("id","name", "email", "id_ecole","created_at","updated_at","role" )->get();
    }
    
    public function auth()
    {
        $user = UserResource::__get();
        return response()->json([
            'user' => ($user),
        ]);
    }
    public function register(Request $request){
        ///validation
        $validData = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'id_ecole' =>'required|exists:ecoles,id',
            "role"=>'required',
                
        ]);
        
        if ($validData->fails()) {
            $response = [
                "success" => false,
                "message" => $validData->errors()
            ];
            return response()->json($response, 400);
        }
        
        // Rest of your code
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken("MyApp")->plainTextToken;
        $success["name"] = $user->name;
        $response = [
            'success' => true,
            'data' => true,
            'message' => 'User registered successfully',
        ];
        return response()->json($response, 200);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('API Token')->plainTextToken;
            session(['authToken' => $token]);
            return response()->json([
                
                'user' => new UserResource($user),
            ]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out'], 200);
}
} 