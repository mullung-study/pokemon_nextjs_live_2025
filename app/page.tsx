
import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import PokemonList from "@/components/PokemonList";
import PokemonPagination from "@/components/PokemonPagination";
import TypeFilter from "@/components/TypeFilter";
import { getPokemon, getPokemonIdByTypes } from "@/lib/pokeAPI";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function PokemonItem({id}:{id:number}) {
  const pokemon = await getPokemon(id);
  return <PokemonCard pokemon={pokemon} priority={true} />
}



export default async function Home({searchParams}:{searchParams:Promise<{page?:string, type?:string}>}) { // type=fire,water,grass
  const params = await searchParams
  const currentPage = Number(params.page)
  if (isNaN(currentPage) || currentPage < 1) {
    redirect("/?page=1")
  } 

  return (
    <div>
      <TypeFilter />
      <PokemonList currentPage={currentPage} />
    </div>
  );
}
