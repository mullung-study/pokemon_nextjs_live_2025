"use client"

import { usePokeFilterStore } from "@/store/pokeFilterStore"
import { Button } from "./ui/button";
import TypeFilter from "./TypeFilter";

export default function SearchBar() {
  const { query, setQuery, filteredPokemons, resetFilters, selectedTypes} = usePokeFilterStore()

  async function handleSearch() {
    filteredPokemons()
  }

  const hasFilters = query || selectedTypes.length > 0;

  return (
    <div className="m-4 p-4 border-2 rounded-2xl">
      <div className="flex items-center gap-3">
        <h3 className="filter-label">검색</h3>
        <input 
          type="text" 
          placeholder="포켓몬 이름 (한글, 영어)"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          onKeyDown={e=>e.key==='Enter' && handleSearch()}
          className="flex-1 px-4 py-2 border-2 rounded-xl"
        />
        <Button onClick={handleSearch}>검색</Button>
      </div>
      <TypeFilter />

      {hasFilters && (
        <div className="flex justify-end">
          <Button onClick={resetFilters}>전체 초기화</Button>
        </div>
      )}
    </div>
  )
}