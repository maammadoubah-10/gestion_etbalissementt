<?php
namespace App\Http\Controllers;

use App\Models\Professeur;
use Illuminate\Http\Request;

class ProfesseurController extends Controller
{
    public function index()
    {
        return response()->json(Professeur::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:professeurs',
            'telephone' => 'nullable|string',
            'specialite' => 'required|string',
        ]);

        $professeur = Professeur::create($request->all());

        return response()->json($professeur, 201);
    }
    public function show($id)
    {
        // Vérifier si l'ID existe bien dans la base
        $professeur = Professeur::find($id);
    
        if (!$professeur) {
            return response()->json(['error' => 'Professeur non trouvé'], 404);
        }
    
        return response()->json($professeur);
    }
    

    public function update(Request $request, $id)
    {
        $professeur = Professeur::find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        $professeur->update($request->all());

        return response()->json($professeur, 200);
    }

    public function destroy($id)
    {
        $professeur = Professeur::find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        $professeur->delete();

        return response()->json(['message' => 'Professeur supprimé'], 200);
    }
}
