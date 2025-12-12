import { getPokemon } from "@/lib/pokeAPI"
import PokemonCard from "@/components/PokemonCard"
import { notFound } from "next/navigation";
import { getPokemonById } from "@/lib/actions/pokemonData";

export default async function PokemonDetails({params}:{params:Promise<{id:string}>}) {

  const {id} = await params
  const pokemon = await getPokemonById(Number(id));

  if (!pokemon) {
    notFound()
  }
  return (
    <div className="flex justify-center m-4" >
      <PokemonCard pokemon={
        {
          id:pokemon.id,
          name:pokemon.name_ko || pokemon.name_en,
          types:pokemon.types,
          image:pokemon.image_url
        }
      } />
    </div>
  )
}
