<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // return response()->json(['message' => 'unauthorized'], 403);
        $users = User::query()
            ->orderBy('id', 'desc')
            ->when($request->search, function ($query, $search) {
                $query->whereAny(['name_en', 'name_ar', 'email'], 'like', '%' . $search . '%');
            })
            ->paginate(20);
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'is_active' => 'required|boolean',
        ]);
        $user = User::create($validated);
        return response()->json($user);
    }

    public function update(User $user, Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:3|exclude',
            'is_active' => 'required|boolean',
        ]);
        if ($request->password) {
            $validated['password'] = bcrypt($request->password);
        }
        $user->update($validated);
        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json($user);
    }
}
