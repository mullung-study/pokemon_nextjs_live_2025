
import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import { getPokemon } from "@/lib/pokeAPI";
import { Suspense } from "react";

async function PokemonItem({id}:{id:number}) {
  const pokemon = await getPokemon(id);
  return <PokemonCard pokemon={pokemon} />
}

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-4">
		  {Array.from({length:151}).map((_, i) => {
        return (
          <Suspense key={i+1} fallback={<PokemonSkeleton />}>
            <PokemonItem  id={i+1}/>
          </Suspense>
        )
      })}
    </div>
  );
}
