<?php
namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CoursController extends Controller
{
    public function index()
    {
        $coursList = Cours::all();
    
        foreach ($coursList as $cours) {
            // Récupérer le nom de la classe
            $classeResponse = Http::get("http://127.0.0.1:8001/api/classes/" . $cours->classe_id);
            if ($classeResponse->successful()) {
                $classeData = $classeResponse->json();
                $cours->classe_nom = $classeData['nom'] ?? 'Classe inconnue';
            } else {
                $cours->classe_nom = 'Classe inconnue';
            }
    
            // Récupérer le nom du professeur
            if ($cours->professeur_id) { // Vérifie que l'ID du professeur existe
                $professeurResponse = Http::get("http://127.0.0.1:8002/api/professeurs/" . $cours->professeur_id);
                if ($professeurResponse->successful()) {
                    $professeurData = $professeurResponse->json();
                    $cours->professeur_nom = $professeurData['nom'] ?? 'Professeur inconnu';
                } else {
                    $cours->professeur_nom = 'Professeur inconnu';
                }
            } else {
                $cours->professeur_nom = 'Aucun professeur';
            }
        }
    
        return response()->json($coursList);
    }
    
    

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'code' => 'required|string|unique:cours',
            'classe_id' => 'required|integer',
            'professeur_id' => 'nullable|integer'
        ]);

        // Vérifier si la classe existe via API `ms-classes`
        $classeResponse = Http::get("http://127.0.0.1:8001/api/classes/" . $request->classe_id);
        if ($classeResponse->failed()) {
            return response()->json(['error' => 'La classe spécifiée n\'existe pas.'], 404);
        }

        // Vérifier si le professeur existe via API `ms-professeurs`
        if ($request->professeur_id) {
            $profResponse = Http::get("http://127.0.0.1:8002/api/professeurs/" . $request->professeur_id);
            if ($profResponse->failed()) {
                return response()->json(['error' => 'Le professeur spécifié n\'existe pas.'], 404);
            }
        }

        $cours = Cours::create($request->all());
        return response()->json($cours, 201);
    }

    public function show($id)
    {
        $cours = Cours::find($id);
        if (!$cours) {
            return response()->json(['error' => 'Cours non trouvé'], 404);
        }

        // Récupérer le nom de la classe via l'API `ms-classes`
        $classeResponse = Http::get("http://127.0.0.1:8001/api/classes/" . $cours->classe_id);
        if ($classeResponse->successful()) {
            $classeData = $classeResponse->json();
            $cours->classe_nom = $classeData['nom'] ?? 'Classe introuvable';
        } else {
            $cours->classe_nom = 'Classe non définie';
        }

        // Récupérer le nom du professeur via l'API `ms-professeurs`
        if ($cours->professeur_id) {
            $profResponse = Http::get("http://127.0.0.1:8002/api/professeurs/" . $cours->professeur_id);
            if ($profResponse->successful()) {
                $profData = $profResponse->json();
                $cours->professeur_nom = $profData['nom'] ?? 'Professeur introuvable';
            } else {
                $cours->professeur_nom = 'Professeur non défini';
            }
        } else {
            $cours->professeur_nom = 'Aucun professeur';
        }

        return response()->json($cours);
    }

    public function update(Request $request, $id)
    {
        $cours = Cours::find($id);
        if (!$cours) {
            return response()->json(['error' => 'Cours non trouvé'], 404);
        }

        $request->validate([
            'nom' => 'string',
            'code' => 'string|unique:cours,code,' . $id,
            'classe_id' => 'integer',
            'professeur_id' => 'integer'
        ]);

        $cours->update($request->all());
        return response()->json($cours);
    }

    public function destroy($id)
    {
        $cours = Cours::find($id);
        if (!$cours) {
            return response()->json(['error' => 'Cours non trouvé'], 404);
        }
        $cours->delete();
        return response()->json(null, 204);
    }
}
