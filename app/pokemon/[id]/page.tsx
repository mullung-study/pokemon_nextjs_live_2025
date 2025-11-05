import { getPokemon } from "@/lib/pokeAPI"
import PokemonCard from "@/components/PokemonCard"

export default async function PokemonDetails({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
  const pokemon = await getPokemon(Number(id));
  return (
    <div className="flex justify-center m-4" >
      <PokemonCard pokemon={pokemon} />
    </div>
  )
}