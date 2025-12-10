"use client"

import { getPokemonIdByTypes } from "@/lib/pokeAPI";
import { usePokeFilterStore } from "@/store/pokeFilterStore";

import PokemonPagination from "./PokemonPagination";
import { usePokemonInit } from "@/hooks/usePokemonInit";
import PokemonCard from "./PokemonCard";
import { PokemonTypeKey } from "@/lib/pokemonTypes";


const ITEMS_PER_PAGE = 12;
// const TOTAL_POKEMON = 1010;

export default function PokemonList({currentPage}:{currentPage:number}) {
  const {allPokemons, filteredResults, selectedTypes, query} = usePokeFilterStore()
  
  usePokemonInit()
  const hasFilters = selectedTypes.length > 0 || query
  const pokemons = hasFilters ? filteredResults : allPokemons || []

  const totalPages = Math.ceil(pokemons.length/ITEMS_PER_PAGE)
  const validPage = Math.min(currentPage, totalPages)
  const startIdx = (validPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayPokemons = pokemons.slice(startIdx, endIdx)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 mx-4">
        {displayPokemons.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              pokemon= {{
                id:pokemon.id,
                name: pokemon.name_ko || pokemon.name_en,
                types: pokemon.types as PokemonTypeKey[],
                image: pokemon.image_url
              }}
            />
          )
        })}
      </div>
      {totalPages >= 1 && (
        <div className="flex justify-center py-6">
          <PokemonPagination currentPage={validPage} totalPages={totalPages}/>
        </div>
      )}

    </>
  )


}