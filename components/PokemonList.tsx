"use client"

import { getPokemonIdByTypes } from "@/lib/pokeAPI";
import { usePokeTypeStore } from "@/store/pokeTypeStore";
import { Suspense, useEffect, useState } from "react";
import PokemonItem from "./PokemonItem";
import PokemonPagination from "./PokemonPagination";


const ITEMS_PER_PAGE = 12;
const TOTAL_POKEMON = 1010;

export default function PokemonList({currentPage}:{currentPage:number}) {
  const {selectedTypes} = usePokeTypeStore()
  const [pokemonIds, setPokemonIds] = useState<number[]>([])

  useEffect( ()=> {
    const fetchIds = async () => {
      try {
        if (selectedTypes.length===0) {
          setPokemonIds(Array.from({length:TOTAL_POKEMON}, (_,i)=>i+1))
        } else {
          const filteredId = await getPokemonIdByTypes(selectedTypes)
          setPokemonIds(filteredId)
        }
      } catch(error) {
        console.error("PokemonList : ", error)
        setPokemonIds(Array.from({length:TOTAL_POKEMON}, (_,i)=>i+1))
      }
    }
    fetchIds()
  }, [selectedTypes])
  const totalPages = Math.ceil(pokemonIds.length/ITEMS_PER_PAGE)
  const validPage = Math.min(currentPage, totalPages)
  const startIdx = (validPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayIds = pokemonIds.slice(startIdx, endIdx)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 mx-4">
        {displayIds.map((i) => {
          return (
            <PokemonItem key={i} id={i}/>
          )
        })}
      </div>
      <div className="flex justify-center py-6">
        <PokemonPagination currentPage={validPage} totalPages={totalPages}/>
      </div>
    </>
  )


}