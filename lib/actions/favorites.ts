"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";


// 찜 추가
export async function addFavoriteAction(pokemon_id:number) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('favorites')
    .insert({ oauth_id: session.user.id, pokemon_id });

  if (error) {
    throw new Error(error.message)
  }

}

// 찜 삭제
export async function removeFavoriteAction(pokemon_id:number) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('oauth_id', session.user.id)
    .eq('pokemon_id', pokemon_id);

  if (error) {
    throw new Error(error.message)
  }
}