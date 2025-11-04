import { PokemonTypeKey } from "./pokemonTypes";

export interface PokemonProps {
  id: number,
  name: string;
  types: PokemonTypeKey[];
  image: string;
}

export async function getPokemon(id:number): Promise<PokemonProps> {
  try {
    console.log(`${id} API Called`)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) throw new Error(`PokeAPI fetch failed : ${res.status} ${res.statusText}`)
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t:{type: {name:string}})=> t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
    }
  } catch (err){
    console.log(err);
    throw err;  
  }
}
    