<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EcoleController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PaimentController;
use App\Http\Controllers\EleveController;

use App\Http\Controllers\NiveauController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\DemandeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//Route::get('/user-info', [AuthController::class, 'getUserInfo'])->middleware('auth:api');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // Check if the user is authenticated
    if ($request->user()) {
        // User is authenticated, display user information
        dd($request->user());
    } else {
        // User is not authenticated
        // Handle the unauthorized request accordingly
        return response('Unauthorized', 401);
    }
});*/
Route::delete('demandes/delete/{id}', [DemandeController::class, 'destroy']);
Route::post('/registration-requests/{id}',  [AuthController::class, 'approveRequest']);
Route::post('/register-request', [DemandeController::class, 'createRequest']);
Route::get('/showRequests', [DemandeController::class, 'showRequests']);
Route::get('/paiment/template', [PaimentController::class, 'downloadTemplate']);
Route::get('/eleves/template', [EleveController::class, 'downloadTemplate']);
Route::post('/eleves/upload', [EleveController::class, 'importExcel']);
Route::put('/eleve/{id}', [EleveController::class, 'update']);
Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/delete/{id}', [AuthController::class, 'destroy']);
Route::resource('ecoles',EcoleController::class);
//Route::get('ecoles',[EcoleController::class, "index"]);
/*
Route ::controller(AuthController::class)->group(function(){
Route::post('register','register');
Route::post('/login', 'Login')->name('login');
Route::get('index', 'index');
Route::get('auth', 'auth');});*/
Route::get('classe', [ClasseController::class, 'index']);
Route::get('user', [AuthController::class, 'index']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware('web')->group(function () {
    Route::get('/sanctum/csrf-cookie', function () {
        return response()->json(['message' => 'CSRF cookie set']);
    });
});

Route::get('/eleve/{id}', [EleveController::class, 'show']);
Route::get('/eleve', [EleveController::class, 'index']);
Route::delete('/eleve/delete/{id}', [EleveController::class, 'destroy']);
Route::get('/paiment', [PaimentController::class, 'index']);


Route::controller(EleveController::class)->group(function(){
    Route::post('/eleve/verification','verification');
    Route::post('/eleve/add','store');
   
    ;});
    
    Route::controller(PaimentController::class)->group(function () {
        Route::post('/paiment', 'payer');
        Route::post('/payment/upload', 'importExcel');
    });

Route::controller(NiveauController::class)->group(function(){
       
        Route::get('/niveau','index');
        ;});