"use client"

import { getAllPokemons } from "@/lib/actions/pokemonData"
import { usePokeFilterStore } from "@/store/pokeFilterStore"
import { useEffect } from "react"

export function usePokemonInit() {
  const { allPokemons, setAllPokemons} = usePokeFilterStore()

  useEffect( ()=>{
    if(!allPokemons) {
      const fetchData = async () => {
        try {
          const data = await getAllPokemons()
          setAllPokemons(data)
        } catch (error) {
          console.error('usePokemonInit error: ', error)
        }
      }
      fetchData()
    }
  }, [allPokemons, setAllPokemons] )

  return null
}