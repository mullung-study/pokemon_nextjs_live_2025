"use server"

import { PokemonsFromSupabase } from "@/types/pokemon";
import { supabase } from "../supabase";

export async function getAllPokemons():Promise<PokemonsFromSupabase[]> {
  const {data, error} = await supabase
    .from('pokemons')
    .select('id, name_en, name_ko, image_url, types')
    .order('id')

  if (error) {
    console.error('getAllPokemons 오류:', error)
    return []
  }
  return data || []
}