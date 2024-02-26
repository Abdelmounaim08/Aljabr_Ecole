<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\Ecole;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EcoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Ecole::select("id","name", "description", "image","adress","contact",'reseaux',"mail",'sitweb',"created_at" )->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)  
    {
        $request->validate([
            "name" => 'required',
            "description" => 'required',
            "image" => "required|image",
            "adress" => 'required',
            "contact" => 'required'
            
            
        ]);
    
        $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('public/ecoles/image', $request->image, $imageName);
    
        Ecole::create([
            "name" => $request->name,
            "description" => $request->description,
            "image" => $imageName,
            "description" => $request->description,
            "adress" => $request->adress,
            "contact" => $request->contact,
            "reseaux" => $request->reseaux,
            "sitweb" => $request->sitweb,
            "mail" => $request->mail
            
        ]);
    
        return response()->json([
            "message" => 'Successfully created the school.'
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Ecole $ecole)
    {
        return response()->json([
            "message"=>$ecole
        ]);
    }

    
    public function update(Request $request, Ecole $ecole)
    {
        $request->validate([
            "name"=>'required',
            "description"=>'required',
            "image"=>"nullable",
            
            
        ]);
        $ecole->fil($request->post())->update();
        if($request->HasFile("image")){
            if($ecole->images){
            $exist = Storage::disk('public')->exists("ecoles/image/{$request->image}");
            if($exist){
                $exist = Storage::disk('public')->delete("ecoles/image/{$request->image}");
            }
        }
        }
        $imageName=Str::random().','.$request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('ecoles/image',$request->image,$imageName);
       $ecole->image=$imageName;
       $ecole->save();
        return response()->json([
            "message"=>'item updated '
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ecole $ecole, Request $request)
    {
        if ($ecole->image) {
            $exist = Storage::disk('public')->exists("ecoles/image/{$request->image}");
            if ($exist) {
                $exist = Storage::disk('public')->delete("ecoles/image/{$request->image}");
            }
        }
        $ecole->delete();
        return response()->json([
            "message" => 'item updated'
        ]);
    }
}
