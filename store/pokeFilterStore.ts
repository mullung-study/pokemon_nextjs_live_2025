import { PokemonTypeKey } from "@/lib/pokemonTypes";
import { PokemonsFromSupabase } from "@/types/pokemon";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokeFilterState {
  allPokemons: PokemonsFromSupabase[] | null;

  selectedTypes: PokemonTypeKey[];
  query: string;
  filteredResults: PokemonsFromSupabase[];

  setAllPokemons: (pokemons: PokemonsFromSupabase[]) => void
  toggleType: (type:PokemonTypeKey) => void;
  setQuery: (q:string) => void;
  filteredPokemons: () => void;
  resetFilters: () => void;
}

export const usePokeFilterStore = create<PokeFilterState>()( 
  persist(
    (set)=> {
      return {
        allPokemons: null,
        selectedTypes:[],
        query: '',
        filteredResults: [],

        setAllPokemons: (pokemons: PokemonsFromSupabase[]) => set({ allPokemons: pokemons}),
        toggleType: (type: PokemonTypeKey) => {
          set( (state) => {
            if(state.selectedTypes.includes(type)) {
              return {selectedTypes: state.selectedTypes.filter( t=> t!==type)}
            } else {
              return {selectedTypes: [...state.selectedTypes, type]}
            }
          })
        },
        setQuery: (q:string) => set({query:q}),
        filteredPokemons: () => set((state)=> {
          if(!state.allPokemons) return {filteredResults:[]}
          let results = state.allPokemons

          if (state.query) {
            const q = state.query.toLowerCase()
            results = results.filter(p => p.name_en.toLowerCase().includes(q) || p.name_ko.includes(q))
          }

          if (state.selectedTypes.length > 0) {
            results = results.filter(p=>p.types.some(t=>state.selectedTypes.includes(t as PokemonTypeKey)))
          }

          return {filteredResults: results}

        }),
        resetFilters: () => set({selectedTypes:[], query: '', filteredResults:[]})
      }
    },
    {name:"pokeTypeStorage"}
  )
)