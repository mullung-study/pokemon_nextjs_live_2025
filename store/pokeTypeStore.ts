import { PokemonTypeKey } from "@/lib/pokemonTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokeTypeState {
  selectedTypes: PokemonTypeKey[];
  toggleType: (type:PokemonTypeKey) => void;
  resetTypes: () => void;
}

export const usePokeTypeStore = create<PokeTypeState>()( 
  persist(
    (set)=> {
      return {
        selectedTypes:[],
        toggleType: (type: PokemonTypeKey) => {
          set( (state) => {
            if(state.selectedTypes.includes(type)) {
              return {selectedTypes: state.selectedTypes.filter( t=> t!==type)}
            } else {
              return {selectedTypes: [...state.selectedTypes, type]}
            }
          })
        },
        resetTypes: () => set({selectedTypes:[]})
      }
    },
    {name:"pokeTypeStorage"}
  )
)