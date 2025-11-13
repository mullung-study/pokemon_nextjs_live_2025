
import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import PokemonPagination from "@/components/PokemonPagination";
import TypeFilter from "@/components/TypeFilter";
import { getPokemon, getPokemonIdByTypes } from "@/lib/pokeAPI";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function PokemonItem({id}:{id:number}) {
  const pokemon = await getPokemon(id);
  return <PokemonCard pokemon={pokemon} priority={true} />
}

const ITEMS_PER_PAGE = 12;
const TOTAL_POKEMON = 1010;

export default async function Home({searchParams}:{searchParams:Promise<{page?:string, type?:string}>}) { // type=fire,water,grass
  const params = await searchParams
  const currentPage = Number(params.page)
  if (isNaN(currentPage) || currentPage < 1) {
    redirect("/?page=1")
  } 

  const selectedTypes = params.type ? params.type.split(',') : []
  let pokemonIds:number[]
  if (selectedTypes.length===0) {
    pokemonIds = Array.from({length: TOTAL_POKEMON}, (_,i)=>i+1) // [1, 2, 3, ... 1010]
  } else {
    pokemonIds = await getPokemonIdByTypes(selectedTypes)
  }
  // console.log("currentPage: ", currentPage)
  const totalPages = Math.ceil(pokemonIds.length/ITEMS_PER_PAGE)
  const validPage = Math.min(currentPage, totalPages)
  // if (currentPage > totalPages) {
  //   redirect(`/?page=${totalPages}`)
  // }

  const startIdx = (validPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayIds = pokemonIds.slice(startIdx, endIdx) // [1,2,3, 10, 20], startIdx=0, endIdx=5

  return (
    <div>
      <TypeFilter />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 mx-4">
        {displayIds.map((i) => {
          return (
            <Suspense key={i} fallback={<PokemonSkeleton />}>
              <PokemonItem  id={i}/>
            </Suspense>
          )
        })}
      </div>
      <div className="flex justify-center py-6">
        <PokemonPagination currentPage={validPage} totalPages={totalPages} params={params}/>
      </div>
    </div>
  );
}
