import { getPokemon } from "@/lib/pokeAPI"
import PokemonCard from "@/components/PokemonCard"
import { notFound } from "next/navigation";

export default async function PokemonDetails({params}:{params:Promise<{id:string}>}) {
  try {
    const {id} = await params
    const pokemon = await getPokemon(Number(id));
    return (
      <div className="flex justify-center m-4" >
        <PokemonCard pokemon={pokemon} />
      </div>
    )
  } catch(error) {
    if (error instanceof Error && error.message==="NOT_FOUND") {
      notFound()
    }
    throw error;
  }

}