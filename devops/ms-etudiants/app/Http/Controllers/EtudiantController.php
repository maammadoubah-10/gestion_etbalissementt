<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{public function index()
    {
        $etudiants = Etudiant::all();
    
        foreach ($etudiants as $etudiant) {
            // Appel API pour récupérer les détails de la classe
            $response = Http::get("http://127.0.0.1:8001/api/classes/" . $etudiant->classe_id);
    
            // Vérifions si la réponse contient bien un objet JSON
            if ($response->successful()) {
                $classeData = $response->json();
                
                // Debug pour voir si la classe est bien récupérée
                \Log::info("Données Classe: ", $classeData);
    
                // Vérification si le champ 'nom' existe bien
                if (isset($classeData['nom'])) {
                    $etudiant->classe_nom = $classeData['nom'];
                } else {
                    $etudiant->classe_nom = "Nom introuvable";
                }
            } else {
                $etudiant->classe_nom = "Non défini"; // Classe non trouvée
            }
        }
    
        return response()->json($etudiants);
    }
    
    
    
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:etudiants',
            'classe_id' => 'required|integer'
        ]);
    
        // Vérifier l'existence de la classe via l'API de ms-classes
        $classeResponse = Http::get("http://127.0.0.1:8001/api/classes/" . $request->classe_id);
    
        if ($classeResponse->failed()) {
            return response()->json(['error' => 'La classe spécifiée n\'existe pas.'], 404);
        }
    
        // Si la classe existe, créer l'étudiant
        $etudiant = Etudiant::create($request->all());
        return response()->json($etudiant, 201);
    }
    

    public function show($id)
    {
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['error' => 'Étudiant non trouvé'], 404);
        }
    
        // Récupérer la classe via l’API
        $response = Http::get("http://127.0.0.1:8001/api/classes/" . $etudiant->classe_id);
        $classeData = $response->json(); // Stocker la réponse

// DEBUG : Afficher la réponse API dans Laravel
        \Log::info('Réponse API Classe:', $classeData);

        if ($response->successful() && isset($classeData['nom'])) {
    $etudiant->classe_nom = $classeData['nom']; // Utiliser le vrai nom
} else {
    $etudiant->classe_nom = 'Non défini';
}

    
        return response()->json($etudiant);
    }
    
    public function update(Request $request, $id)
    {
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['error' => 'Étudiant non trouvé'], 404);
        }
    
        // 🔥 Vérifier si la classe existe via l'API du microservice classes
        if ($request->has('classe_id')) {
            $classeResponse = Http::get("http://127.0.0.1:8001/api/classes/" . $request->classe_id);
            if ($classeResponse->failed()) {
                return response()->json(['error' => 'La classe spécifiée n\'existe pas.'], 404);
            }
        }
    
        // 🔥 Mise à jour des données
        $etudiant->update($request->all());
    
        return response()->json($etudiant);
    }
    
    

    public function destroy($id)
    {
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['error' => 'Étudiant non trouvé'], 404);
        }
        $etudiant->delete();
        return response()->json(null, 204);
    }
}

