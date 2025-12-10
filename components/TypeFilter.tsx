"use client"

import { getAllTypeNames, PokemonTypeKey } from "@/lib/pokemonTypes"
import { useEffect, useState } from "react"
import TypeBadge from "./TypeBadge"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { usePokeFilterStore } from "@/store/pokeFilterStore"

export default function TypeFilter() {
  const router = useRouter()

  const {selectedTypes, toggleType, filteredPokemons} = usePokeFilterStore()

  function handleClick(type:PokemonTypeKey) {
    toggleType(type)
    filteredPokemons()

  }

  useEffect( ()=>console.log(selectedTypes), [selectedTypes] )

  return (
    <div className="flex items-start gap-3">
      <h3 className="filter-label">타입</h3>
      <div className="flex flex-wrap gap-2.5">
        {getAllTypeNames().map( (type) => {
          return (
            <div key={type} className="cursor-target">
              <TypeBadge 
                typeName={type as PokemonTypeKey}
                onClick={()=>handleClick(type as PokemonTypeKey)}
                isSelected={selectedTypes.includes(type as PokemonTypeKey)}
              />
            </div>

          )
        })}
      </div>
    </div>
  )
}