<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Models\Emploi;
use Illuminate\Http\Request;

class EmploiController extends Controller
{
    public function index()
    {
        $emplois = Emploi::all();
    
        // On récupère tous les professeurs et cours en une seule requête pour éviter trop d'appels
        $professeurs = Http::get('http://127.0.0.1:8003/api/professeurs')->json();
        $cours = Http::get('http://127.0.0.1:8002/api/cours')->json();
    
        // On transforme les résultats en tableaux associatifs [id => nom]
        $professeursAssoc = collect($professeurs)->pluck('nom', 'id')->toArray();
        $coursAssoc = collect($cours)->pluck('nom', 'id')->toArray();
    
        // Ajout des noms au résultat
        $emplois = $emplois->map(function ($emploi) use ($professeursAssoc, $coursAssoc) {
            return [
                'id' => $emploi->id,
                'jour' => $emploi->jour,
                'heure_debut' => $emploi->heure_debut,
                'heure_fin' => $emploi->heure_fin,
                'salle' => $emploi->salle,
                'professeur' => $professeursAssoc[$emploi->professeur_id] ?? 'Inconnu',
                'cours' => $coursAssoc[$emploi->cours_id] ?? 'Inconnu',
            ];
        });
    
        return response()->json($emplois);
    }
    

    public function store(Request $request)
{
    $request->validate([
        'jour' => 'required|string',
        'heure_debut' => 'required',
        'heure_fin' => 'required',
        'salle' => 'required|string',
        'professeur_id' => 'required|integer',
        'cours_id' => 'required|integer',
    ]);

    // Vérifier que le professeur existe
    $professeur = Http::get("http://127.0.0.1:8003/api/professeurs/{$request->professeur_id}");
    if ($professeur->failed()) {
        return response()->json(['error' => 'Professeur non trouvé'], 404);
    }

    // Vérifier que le cours existe
    $cours = Http::get("http://127.0.0.1:8002/api/cours/{$request->cours_id}");
    if ($cours->failed()) {
        return response()->json(['error' => 'Cours non trouvé'], 404);
    }

    // Enregistrement dans la base de données
    $emploi = Emploi::create($request->all());

    return response()->json($emploi, 201);
}


    public function show($id)
    {
        $emploi = Emploi::findOrFail($id);
    
        // Récupération des informations du professeur et du cours
        $professeur = Http::get("http://127.0.0.1:8003/api/professeurs/{$emploi->professeur_id}")->json();
        $cours = Http::get("http://127.0.0.1:8002/api/cours/{$emploi->cours_id}")->json();
    
        return response()->json([
            'id' => $emploi->id,
            'jour' => $emploi->jour,
            'heure_debut' => $emploi->heure_debut,
            'heure_fin' => $emploi->heure_fin,
            'salle' => $emploi->salle,
            'professeur' => $professeur['nom'] ?? 'Inconnu',
            'cours' => $cours['nom'] ?? 'Inconnu',
        ]);
    }
    

    public function update(Request $request, $id)
    {
        $request->validate([
            'jour' => 'sometimes|string',
            'heure_debut' => 'sometimes',
            'heure_fin' => 'sometimes',
            'salle' => 'sometimes|string',
            'professeur_id' => 'sometimes|integer',
            'cours_id' => 'sometimes|integer',
        ]);
    
        $emploi = Emploi::findOrFail($id);
    
        if ($request->has('professeur_id')) {
            $professeur = Http::get("http://127.0.0.1:8003/api/professeurs/{$request->professeur_id}");
            if ($professeur->failed()) {
                return response()->json(['error' => 'Professeur non trouvé'], 404);
            }
        }
    
        if ($request->has('cours_id')) {
            $cours = Http::get("http://127.0.0.1:8002/api/cours/{$request->cours_id}");
            if ($cours->failed()) {
                return response()->json(['error' => 'Cours non trouvé'], 404);
            }
        }
    
        $emploi->update($request->all());
    
        return response()->json($emploi);
    }
    
    public function destroy($id)
{
    $emploi = Emploi::findOrFail($id);
    $emploi->delete();

    return response()->json(null, 204);
}

}
