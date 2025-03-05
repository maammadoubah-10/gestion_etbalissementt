<?php
namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function index()
    {
        return Classe::all();
    }

    public function store(Request $request)
    {
        $classe = Classe::create($request->all());
        return response()->json($classe, 201);
    }

    public function show($id)
    {
        $classe = Classe::find($id);
    
        if (!$classe) {
            return response()->json(['error' => 'Classe non trouvée'], 404);
        }
    
        return response()->json($classe);
    }
    

    public function update(Request $request, $id)
    {
        $classe = Classe::find($id);
        if (!$classe) {
            return response()->json(['error' => 'Classe non trouvée'], 404);
        }

        $request->validate([
            'nom' => 'string',
            'niveau' => 'string'
        ]);

        $classe->update($request->all());
        return response()->json($classe);
    }

    public function destroy($id)
    {
        $classe = Classe::find($id);
        if (!$classe) {
            return response()->json(['error' => 'Classe non trouvée'], 404);
        }
        $classe->delete();
        return response()->json(null, 204);
    }
}
